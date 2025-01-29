
import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddProductMutation } from '../../../redux/features/products/productsApi';
import Swal from 'sweetalert2';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imageFile, setimageFile] = useState(null);
    const [addBook, {isLoading, isError}] = useAddProductMutation()
    const [imageFileName, setimageFileName] = useState('')
    
    const onSubmit = async (data) => {
        const newBookData = {
            ...data,
            coverImage: imageFileName,
            stock: Number(data.stock) // Convertir a número
        }
        try {
            await addBook(newBookData).unwrap();
            Swal.fire({
                title: "Producto agregado",
                text: "El producto fue agregado correctamente",
                icon: "success",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Confirmar"
              });
              reset();
              setimageFileName('')
              setimageFile(null);
        } catch (error) {
            console.error(error);
            alert("Error, vuelva a intentar")   
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if(file) {
            setimageFile(file);
            setimageFileName(file.name);
        }
    }

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Agregar Producto</h2>

      {/* Form starts here */}
      <form onSubmit={handleSubmit(onSubmit)} className=''>
        {/* Reusable Input Field for Title */}
        <InputField
          label="Nombre"
          name="title"
          placeholder="Ingresa el nombre del producto"
          register={register}
        />

        {/* Reusable Textarea for Description */}
        <InputField
          label="Descripcion"
          name="description"
          placeholder="Ingresa una Descripcion"
          type="textarea"
          register={register}

        />

        {/* Reusable Select Field for Category */}
        <SelectField
          label="Categoria"
          name="category"
          options={[
            { value: '', label: 'Elige una Categoria' },
            { value: 'frutas y verduras', label: 'Frutas y Verduras' },
            { value: 'carnes y pescados', label: 'Carnes y Pescados' },
            { value: 'lacteos y huevos', label: 'Lacteos y Huevos' },
            { value: 'granos y cereales', label: 'Granos y Cereales' },
            { value: 'panaderia', label: 'Panaderia' },
            { value: 'bebidas', label: 'Bebidas' },
            { value: 'congelados', label: 'Congelados' },
            { value: 'snacks', label: 'Snacks' },
            { value: 'limpieza y hogar', label: 'Limpieza y Hogar' },
            { value: 'mascotas', label: 'Mascotas' },
            { value: 'condimentos', label: 'Condimentos' },
          ]}
          register={register}
        />

        {/* Trending Checkbox */}
        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Mas vendidos</span>
          </label>
        </div>

        {/* Nuevo campo para el stock */}
        <InputField
          label="Stock"
          name="stock"
          type="number"
          placeholder="Ingresa la cantidad en stock"
          register={register}
          options={{
            min: {
              value: 0,
              message: "El stock no puede ser negativo"
            }
          }}
        />

        {/* Old Price */}
        <InputField
          label="Precio Normal"
          name="oldPrice"
          type="float"
          placeholder="Precio Afiliado"
          register={register}
         
        />

        {/* New Price */}
        <InputField
          label="Precio Afiliado"
          name="newPrice"
          type="float"
          placeholder="Precio Afiliado"
          register={register}
          
        />

        {/* Cover Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Imagen</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Seleccionado: {imageFileName}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full py-2 bg-green-500 text-white font-bold rounded-md">
         {
            isLoading ? <span className="">Agregando.. </span> : <span>Agregar producto</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddBook