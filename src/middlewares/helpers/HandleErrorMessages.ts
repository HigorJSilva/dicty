
import * as _ from 'lodash'

export function handleErrorMessage (erros: any[]): any[] {
  const grouped = _.groupBy(erros, function (item: {param: string}) {
    return item.param
  })
  const errorsArray = _.each(grouped, function (value: any, key: any, list: any) {
    const errors: any[] = []
    value.forEach((element: { msg: string }) => {
      errors.push(element.msg)
    })
    list[key] = errors
    return list[key]
  })
  return errorsArray
}
