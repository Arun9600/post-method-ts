import { BASE_URL } from "./utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
const FormPage: React.FC = () => {
  const [success, setSuccess] = useState("");
  interface Inputs {
    title: string;
    number: number;
    description: string;
    image: string;
    category: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch(`${BASE_URL}/products`, {
      method: "POST",
      body: JSON.stringify({
        title: data.title,
        price: data.number,
        description: data.description,
        image: data.image,
        category: data.category,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((datas) => {
        console.log(datas);
        reset();
        setSuccess("Your Data has been Sent");

        setTimeout(() => {
          setSuccess("");
        }, 3000);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Product Title</label>
          <input type="text" {...register("title", { required: true })} />
          {errors.title && <p>Title is Required</p>}
        </div>
        <div>
          <label>Price</label>
          <input type="number" {...register("number", { required: true })} />
          {errors.number && <p>Price is Required</p>}
        </div>
        <div>
          <label>Description</label>
          <input type="text" {...register("description", { required: true })} />
          {errors.description && <p>Description is Required</p>}
        </div>
        <div>
          <label>Image</label>
          <input type="text" {...register("image")} />
        </div>
        <div>
          <label>Category</label>
          <input type="text" {...register("category")} />
        </div>
        <div>
          <input type="submit" />
        </div>
        {success && <p>{success}</p>}
      </form>
    </>
  );
};

export default FormPage;
