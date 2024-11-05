import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input, Select, RTE } from '../index';
import service from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';

function Postform({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || '',
      slug: post?.$id || "",
      content: post?.content || '',
      status: post?.status || 'active',
    },
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const userData = useSelector(state => state.auth.userData);

  const notifyOnUpdate = () => toast.success("Post updated!");
  const notifyOnCreate = () => toast.success("Kudos 👏 Post published");
  const notifyAfterError = () => toast.error("Something went wrong!!!");

  const submit = async (data) => {
    console.log("working");
    
    if (!data.image || !data.image[0]) {
      setErrorMessage('Choosing an image is mandatory');
      setTimeout(() => setErrorMessage(''), 5000);
      return;
    }

    setLoading(true);

    try {
      let file;
      if (data.image[0]) {
        file = await service.uploadFile(data.image[0]);
        if (post && post.featuredImage) {
          await service.deleteFile(post.featuredImage);
        }
      }

      let dbPost;
      if (post) {
        dbPost = await service.updatePost(post.$id, { ...data, featuredImage: file?.$id });
        if (dbPost) {
          notifyOnUpdate();
          navigate(`/post/${dbPost.slug}`);
        }
      } else {
        dbPost = await service.createPost({ ...data, featuredImage: file?.$id, userId: userData.$id,user: userData.name});
        if (dbPost) {
          notifyOnCreate();
          navigate(`/post/${dbPost.$id}`);
        }
      }
    } catch (error) {
      notifyAfterError();
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const slugTransform = useCallback((value) => {
    return value && typeof value === 'string'
      ? value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-")
      : '';
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'title') {
        setValue('slug', slugTransform(value.title));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-2">
      {post && (
        <div className="w-full mb-4">
          <img src={service.getFilePreview(post.featuredImage)} alt={post.title} className="rounded-lg w-full" />
        </div>
      )}
      <div className="w-full flex flex-wrap justify-between items-center">
        <Input
          type="file"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          className="w-[unset]"
          {...register("image", { required: !post })}
        />
        <span className="flex space-x-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          <p className="text-lg">Add cover image</p>
        </span>
      </div>
      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
      <div className="w-full px-2">
        <Input placeholder="Enter Your Title Here..." className="mb-4 py-4" {...register("title", { required: true })} />
        <Input
          placeholder="Slug"
          className="mb-4 py-4"
          {...register("slug", { required: true })}
          onInput={(e) => setValue("slug", slugTransform(e.currentTarget.value))}
        />
        <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
      </div>
      <div className="w-full sm:w-1/3 px-2 gap-1">
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
        id="status"
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        {...register("status", { required: true })}
    >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        </select>
        </div>
        <Button type="submit" disabled={loading} className="px-6 text-lg rounded-[100px] bg-gradient-to-r from-[#3652E1] via-[#8057F5] to-[#7851E8]">
          {loading ? "Publishing..." : post ? "Update" : "Publish"}
        </Button>
      </div>
    </form>
  );
}

export default Postform;
