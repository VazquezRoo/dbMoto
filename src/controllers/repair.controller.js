const Repair = require("../models/repair.model");

exports.findProducts = async (req, res) => {
  const time = req.requestTime;

  const repairs = await Repair.findAll({
    where: {
      state: true,
    },
  });

  return res.json({
    requestTime: time,
    results: repairs.length,
    status: "succes",
    message: "Products found",
    repairs,
  });
};

exports.updateProduct = async (req, res) => {
  try {
    // 1. TRAERNOS EL PRODUCTO QUE IBAMOS A ACTUALIZAR
    const { id } = req.params;
    // 2. NOS TRAJIMOS DE EL BODY LA INFORMACION QUE VAMOS A ACTUALIZAR
    // 3. BUSCAR EL PRODUCTO QUE VAMOS A ACTUALIZAR
    const product = await Repair.findOne({
      where: {
        id,
        state: true,
      },
    });
    // 4. VALIDAR SI EL PRODUCTO EXISTE
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: `Product with id: ${id} not found`,
      });
    }
    // 5. PROCEDO A ACTUALIZARLO
    await product.update({ status: "completed" });

    // 6. ENVIO LA CONFIRMACIÓN DE EXITO AL CLIENTE
    res.status(200).json({
      status: "success",
      message: "The product has been updated",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // PASO 1: OBTENER INFORMACION A CREAR DE LA REQ.BODY
    const { date, userid } = req.body;

    //PASO 2: CREAR EL PRODUCTO UTILIZANDO EL MODELO

    const product = await Repair.create({
      date,
      userid,
    });

    // PASO 3: ENVIAR UNA RESPUESTA AL CLIENTE

    return res.status(201).json({
      message: "The product has been created!",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
};

exports.findProduct = async (req, res) => {
  try {
    //? 1. NOS TRAEMOS EL ID DE LOS PARAMETROS
    const { id } = req.params; //DESTRUCION DE OBJETOS

    //? 2. BUSCO EL PRODUCTO EN LA BASE DE DATOS
    const product = await Repair.findOne({
      where: {
        id,
        state: true,
      },
    });

    //? 3. VALIDAR SI EL PRODUCTO EXISTE, SI NO, ENVIAR UN ERROR 404
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: `The product with id: ${id} not found!`,
      });
    }

    //? 4. ENVIAR LA RESPUESTA AL CLIENTE
    return res.status(200).json({
      status: "success",
      message: "Product found",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    //! traernos el id de los parametros
    const { id } = req.params;
    //! buscar el producto
    const product = await Repair.findOne({
      where: {
        state: true,
        id,
      },
    });
    //! validar si existe el producto
    if (!product) {
      return res.status(404).json({
        status: "error",
        message: `Product with id: ${id} not found!`,
      });
    }
    //! actualizar el producto encontrado y actualizar el status a false
    await product.update({ state: false }); //eliminacion logica
    //await product.destroy() //eliminacion fisica
    //! enviar respuesta al cliente
    return res.status(200).json({
      status: "success",
      message: "the product has been deleted!",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
};
