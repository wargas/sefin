import { useFormik } from "formik";
import { get } from "lodash";
import { useMemo } from "react";
import tabelas from "../config/tabelas";

export function useCalculo() {
  const form = useFormik({
    initialValues: {
      aliquotaComplentar: "8,5",
      depentesIR: "0",
      cargo: "AUD",
      titulacao: "15",
      gdf: "80",
      reajuste: '0',
      sindicato: '0',
      fortSaude: '1',
      fidaf: '0',
      rav: '0'
    },
    async onSubmit() { },
  });


  const reajuste = useMemo(() => {
    return 1 + (parseFloat(form.values.reajuste) * 0.01)
  }, [form.values])

  const vencimento = useMemo(() => {
    return (
      get(
        tabelas.vencimentos,
        `202301-209912.${form.values.cargo}.240.A.I`,
        0
      ) * 1.0462 * reajuste
    );
  }, [form.values, reajuste]);

  const gdf = useMemo(() => {
    const bc = get(
      tabelas.vencimentos,
      `202301-209912.${form.values.cargo}.240.A.IV`,
      0
    );
    return bc * parseInt(form.values.gdf) * 0.004 * reajuste * 1.0462
  }, [vencimento, form.values, reajuste]);

  const combustivel = useMemo(() => {
    if (form.values.cargo != 'AUD') {
      return 0;
    }

    return tabelas.combustivel;
  }, [form.values.cargo])

  const ita = useMemo(() => {
    return ((vencimento || 0) * parseInt(form.values.titulacao)) / 100;
  }, [vencimento, form.values]);

  const rav = useMemo(() => {
    return (parseFloat(form.values.rav))
  }, [form.values])

  const teto = useMemo(() => {
    const baseTeto = vencimento+ita+gdf+rav;
    if(baseTeto < tabelas.salario_prefeito) {
      return 0
    }

    return baseTeto - tabelas.salario_prefeito;
  }, [form.values])

  const ipm = useMemo(() => {
    return tabelas.tetoRGPS * 0.14;
  }, []);

  const ceprev = useMemo(() => {
    const aliquota = parseFloat(form.values.aliquotaComplentar.replace(',', '.')) * 0.01;
    return (vencimento + ita + gdf + rav - teto - tabelas.tetoRGPS) * aliquota;
  }, [form.values]);

  const fortsaude = useMemo(() => {
    if (form.values.fortSaude != '1') {
      return 0
    }
    return (
      vencimento +
      ita +
      gdf +
      rav - teto) * 0.02
  }, [vencimento, ita, vencimento, form.values])

  const fidaf = useMemo(() => {
    return parseFloat(form.values.fidaf) || 0
  }, [form.values])

  

  const irpf = useMemo(() => {
    const depen = (parseInt(form.values.depentesIR) || 0) * 189.59;
    return (
      (vencimento + ita + gdf + fidaf + rav - teto - ceprev - ipm - depen) * 0.275 - tabelas.irpf
    );
  }, [vencimento, ita, ceprev, gdf, ipm, teto, form.values]);

  const sindicato = useMemo(() => {
    return parseFloat(form.values.sindicato) || 0
  }, [form.values])

  

  const liquido = useMemo(() => {
    return vencimento +
      ita +
      gdf +
      fidaf +
      rav +
      combustivel -
      teto -
      ipm -
      ceprev -
      fortsaude -
      sindicato -
      irpf
  }, [vencimento, ita, ceprev, gdf, ipm, irpf, fortsaude, sindicato, fidaf])



  return { form, liquido, ceprev, ipm, ita, gdf, vencimento, reajuste, teto, irpf, fortsaude, sindicato, fidaf, combustivel, rav }
}