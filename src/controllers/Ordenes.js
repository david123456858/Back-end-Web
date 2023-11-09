import Ordenes from '../Model/Orden.js'
// import { tokenSing } from '../helpers/Tokens-Ordenes.js'

export const getData = async (req, res) => {
  try {
    const data = await Ordenes.find()
    // const users = {
    //   rol: 'Operario'
    // }
    // const user = await tokenSing(users)
    // res.status(200).json(user)
    if (req.rol === 'Admin') {
      res.status(200).json(data)
    } else {
      res.status(402).json({ data: ' No tienes acceso a esta informacion' })
    }
  } catch (error) {
    console.log('mira lo que es ' + error)
    res.status(500).json({ data: 'Error Server Internal' })
  }
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
