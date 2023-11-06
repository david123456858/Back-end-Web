import Ordenes from '../Model/Orden.js'

export const getData = async (req, res) => {
  const data = await Ordenes.find()
  res.status(200).json(data)
}

export const SaveDatos = async (req, res) => {
  try {
    const { estado, prioridad } = req.body
    const ordenPriodidad = {
      Alta: '1',
      Baja: '2'
    }
    const orden = {
      estado,
      prioridad: ordenPriodidad[prioridad],
      idAdmin: null,
      idEquipo: null,
      description: null,
      repuestos: null,
      TimeStar: null,
      TimeFinished: null,
      check: false
    }
    const ordenCreate = await Ordenes.create(orden)
    res.status(201).json(ordenCreate)
  } catch (error) {
    console.log(error)
    res.status(500).json({ data: 'Server internal' })
  }
}
