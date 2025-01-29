import React, { useEffect } from 'react';
import InputField from '../addBook/InputField';
import SelectField from '../addBook/SelectField';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchProductByIdQuery, useUpdateProductMutation } from '../../../redux/features/products/productsApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseURL';

const UpdateBook = () => {
  const { id } = useParams();
  const { data: bookData, isLoading, isError, refetch } = useFetchProductByIdQuery(id);
  const [updateBook] = useUpdateProductMutation();
  const { register, handleSubmit, setValue, reset } = useForm();

  // Establecer valores iniciales del formulario
  useEffect(() => {
    if (bookData) {
      setValue('title', bookData.title);
      setValue('description', bookData.description);
      setValue('category', bookData?.category);
      setValue('trending', bookData.trending);
      setValue('oldPrice', bookData.oldPrice);
      setValue('newPrice', bookData.newPrice);
      setValue('coverImage', bookData.coverImage);
      setValue('stock', bookData.stock); // Establecer el valor inicial del stock
    }
  }, [bookData, setValue]);

  // Función para manejar la actualización del producto
  const onSubmit = async (data) => {
    console.log("Datos del formulario:", data);

    const updateBookData = {
      title: data.title,
      description: data.description,
      category: data.category,
      trending: data.trending,
      oldPrice: parseFloat(data.oldPrice),  // Usar parseFloat
      newPrice: parseFloat(data.newPrice),  // Usar parseFloat
      coverImage: data.coverImage || bookData.coverImage,
      stock: Number(data.stock), // Incluir el stock en los datos actualizados
      
    };
    console.log("Datos convertidos:", updateBookData);

    try {
      await axios.put(`${getBaseUrl()}/api/products/edit/${id}`, updateBookData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      Swal.fire({
        title: 'Actualizar Producto',
        text: 'El producto fue actualizado',
        icon: 'success',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
      });
      await refetch();
    } catch (error) {
      console.log('Error al actualizar:', error);
      alert('Error al actualizar.');
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error con los datos del producto</div>;

  return (
    <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Actualizar Producto</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Título"
          name="title"
          placeholder="Ingresa el nombre del producto"
          register={register}
        />

        <InputField
          label="Descripción"
          name="description"
          placeholder="Ingresa una descripción del producto"
          type="textarea"
          register={register}
        />

        <SelectField
          label="Categoría"
          name="category"
          options={[
            { value: '', label: 'Elige una Categoría' },
            { value: 'frutas y verduras', label: 'Frutas y Verduras' },
            { value: 'carnes y pescados', label: 'Carnes y Pescados' },
            { value: 'lacteos y huevos', label: 'Lácteos y Huevos' },
            { value: 'granos y cereales', label: 'Granos y Cereales' },
            { value: 'panaderia', label: 'Panadería' },
            { value: 'bebidas', label: 'Bebidas' },
            { value: 'congelados', label: 'Congelados' },
            { value: 'snacks', label: 'Snacks' },
            { value: 'limpieza y hogar', label: 'Limpieza y Hogar' },
            { value: 'mascotas', label: 'Mascotas' },
            { value: 'condimentos', label: 'Condimentos' },
          ]}
          register={register}
        />

        <div className="mb-4">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('trending')}
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm font-semibold text-gray-700">Más vendidos</span>
          </label>
        </div>

      
        <InputField
          label="Precio Normal"
          name="oldPrice"
          type="float"  
          placeholder="Ej: 0.75"
          register={register}
        />

        <InputField
          label="Precio Afiliado"
          name="newPrice"
          type="float"  
          placeholder="Ej: 0.60"
          register={register}
        />

        {/* Nuevo campo para el stock */}
        <InputField
          label="Stock"
          name="stock"
          type="number"
          placeholder="Ingresa la cantidad en stock"
          register={register}
        />

        <InputField
          label="Cover Image URL"
          name="coverImage"
          type="text"
          placeholder="Cover Image URL"
          register={register}
        />

        <button type="submit" className="w-full py-2 bg-blue-500 text-white font-bold rounded-md">
          Actualizar Producto
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;