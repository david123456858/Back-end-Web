export const obtenerFecha = () => {
  const date = new Date()
  const año = date.getFullYear()
  const mes = date.getMonth() + 1
  const dias = date.getDay()
  const horas = date.getHours()
  const minutos = date.getMinutes()

  const fecha = `${año}-${mes}-${dias} ${horas}:${minutos}`
  return fecha
}
