export function attrs(
  attrs: Record<string, string | boolean | undefined | null>,
): string {
  return Object.entries(attrs)
    .filter(([_, v]) => v)
    .map(([k, v]) => `${k}="${v}"`)
    .join(' ')
}

export function table(rows: string[][]) {
  return `<table>
<tbody>
${rows
  .map(
    cols => `<tr>
${cols.map(col => `<td>${col}</td>`).join('')}
</tr>`,
  )
  .join('')}
</tbody>
</table>`
}

export type InputOptions = {
  label: string
  input: string
}

export function inputs(inputs: InputOptions[]) {
  const rows = inputs.map(x => [
    x.label ? `<label>${x.label}:</label>` : '',
    x.input,
  ])
  return table(rows)
}

export type RadioOption = {
  text: string
  value: string
}
export type RadioOptions = {
  options: RadioOption[]
  id: string
  onchange?: string
}

export function radios(options: RadioOptions) {
  return options.options
    .map(o => {
      const id = options.id + '_' + o.value
      return `
<div style="display: inline-block">
  <input type="radio" ${attrs({
    id,
    value: o.value,
    name: options.id,
    onchange: options.onchange,
  })}>
  <label for="${id}">${o.text}</label>
</div>
  `
    })
    .join('')
}
