import { LineValue } from './components/LineValue';
import { useCalculo } from './hooks/calculo';

function money(n: number) {
  const format = new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return 'R$ ' + format.format(n);
}

function App() {
  const {
    form,
    liquido,
    ceprev,
    ipm,
    ita,
    gdf,
    vencimento,
    irpf,
    fortsaude,
    sindicato,
    fidaf,
    combustivel,
    rav,
    teto,
  } = useCalculo();

  return (
    <div
      data-theme='light'
      className='w-full h-screen overflow-y-scroll bg-gray-50 md:py-4'>
      <div className='bg-white divide-x shadow md:rounded-lg md:max-w-screen-xl  mx-auto md:pb-4 flex'>
        <div className='flex flex-col p-4 gap-2 w-[400px] '>
          <div>
            <div>Alíq. Prev. comp. </div>
            <input
              {...form.getFieldProps('aliquotaComplentar')}
              className='input input-sm input-bordered'
              type='text'
            />
          </div>
          <div>
            <div>Dependentes IR</div>
            <input
              {...form.getFieldProps('depentesIR')}
              className='input input-sm input-bordered'
              type='number'
            />
          </div>
          <div>
            <div>Cargo</div>
            <div>
              <select
                {...form.getFieldProps('cargo')}
                className='select w-full select-sm select-bordered'>
                <option value=''></option>
                <option value='AUD'>Auditor</option>
                <option value='ANA'>Analista</option>
              </select>
            </div>
          </div>
          <div>
            <div>Titulação</div>
            <select
              {...form.getFieldProps('titulacao')}
              className='select w-full select-sm select-bordered'>
              <option value='0'></option>
              <option value='15'>15%</option>
              <option value='35'>35%</option>
              <option value='45'>45%</option>
            </select>
          </div>
          <div>
            <div>% GDF</div>
            <input
              {...form.getFieldProps('gdf')}
              className='input input-sm input-bordered'
              type='number'
            />
          </div>
          <div>
            <div>% Reajuste</div>
            <input
              {...form.getFieldProps('reajuste')}
              className='input input-sm input-bordered'
              type='number'
            />
          </div>
          <div>
            <div>Sindicato</div>
            <input
              {...form.getFieldProps('sindicato')}
              className='input input-sm input-bordered'
              type='number'
            />
          </div>
          <div>
            <div>FortSaude</div>
            <div className='flex gap-4'>
              <label htmlFor=''>
                Sim{' '}
                <input
                  type='radio'
                  onChange={() => form.setFieldValue('fortSaude', '1')}
                  checked={form.values.fortSaude == '1'}
                />
              </label>
              <label htmlFor=''>
                Não{' '}
                <input
                  type='radio'
                  onChange={() => form.setFieldValue('fortSaude', '0')}
                  checked={form.values.fortSaude == '0'}
                />
              </label>
            </div>
          </div>
          <div>
            <div>FIDAF</div>
            <input
              {...form.getFieldProps('fidaf')}
              className='input input-sm input-bordered'
              type='number'
            />
          </div>
          <div>
            <div>RAV</div>
            <input
              {...form.getFieldProps('rav')}
              className='input input-sm input-bordered'
              type='number'
            />
          </div>
        </div>

        <table className='table'>
          <LineValue label='Vencimento Básico:' value={money(vencimento)} />
          <LineValue label='GDF' value={money(gdf)} />
          <LineValue label='Incentivo a titulação' value={money(ita)} />
          <LineValue label='Auxílio combustível' value={money(combustivel)} />
          <LineValue label='FIDAF' value={money(fidaf)} />
          <LineValue label='RAV' value={money(rav)} />
          <LineValue
            subtotal
            label='BRUTO'
            value={money(vencimento + ita + gdf + combustivel + fidaf + rav)}
          />
          <LineValue label='Desconto TETO' value={money(teto)} />
          <LineValue label='IPM PREVIFOR' value={money(ipm)} />
          <LineValue label='CEPREV' value={money(ceprev)} />
          <LineValue label='FortSaude' value={money(fortsaude)} />
          <LineValue label='Sindicato' value={money(sindicato)} />
          <LineValue label='IRPF' value={money(irpf)} />
          <LineValue
            subtotal
            label='DESCONTOS'
            value={money(ipm + ceprev + irpf + teto + fortsaude)}
          />
          <LineValue total label='LÍQUIDO' value={money(liquido)} />
        </table>
      </div>
    </div>
  );
}

export default App;
