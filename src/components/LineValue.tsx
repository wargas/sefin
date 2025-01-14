import clsx from "clsx"

type Props = {
    label: string,
    value: string,
    subtotal?: boolean,
    total?: boolean
}
export function LineValue({ label, value, subtotal, total }: Props) {
    return <tr className={clsx('cursor-pointer', { 'bg-gray-300': subtotal, 'bg-black text-white': total })}>
        <td className="">{label}</td>
        <td className="text-right font-bold">{value}</td>
    </tr>
}