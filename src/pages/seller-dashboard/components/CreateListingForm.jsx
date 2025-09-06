import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { marketplaceService } from '../../../services/marketplaceService';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import PhotoUploadZone from './PhotoUploadZone';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  category_id: z.string().min(1, 'Category is required'),
  condition: z.enum(['new', 'excellent', 'good', 'fair']),
  stock_quantity: z.number().int().min(1, 'Stock quantity must be at least 1'),
  brand: z.string().optional(),
  story_snippet: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

const CreateListingForm = ({ onListingCreated }) => {
  const [categories, setCategories] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await marketplaceService.getCategories();
      if (data) {
        setCategories(data);
      }
    };
    fetchCategories();
  }, []);

  const handlePhotosUploaded = (photos) => {
    setUploadedImages(photos.map(p => ({ url: p.url, alt: p.file.name })));
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const productData = {
        ...formData,
        images: uploadedImages,
      };
      const { data, error } = await marketplaceService.addProduct(productData);
      if (error) {
        throw new Error(error);
      }
      onListingCreated(data);
      reset();
      setUploadedImages([]);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <PhotoUploadZone onPhotosUploaded={handlePhotosUploaded} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Title"
          name="title"
          register={register}
          error={errors.title}
          placeholder="e.g., Vintage Leather Jacket"
        />
        <Select
          label="Category"
          name="category_id"
          register={register}
          error={errors.category_id}
          options={categories.map((c) => ({ value: c.id, label: c.name }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Description</label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
          placeholder="Describe the item's condition, history, and any unique features..."
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Input
          label="Price"
          name="price"
          type="number"
          register={register}
          error={errors.price}
          placeholder="0.00"
        />
        <Select
          label="Condition"
          name="condition"
          register={register}
          error={errors.condition}
          options={[
            { value: 'new', label: 'Like New' },
            { value: 'excellent', label: 'Excellent' },
            { value: 'good', label: 'Good' },
            { value: 'fair', label: 'Fair' },
          ]}
        />
        <Input
          label="Stock Quantity"
          name="stock_quantity"
          type="number"
          register={register}
          error={errors.stock_quantity}
          defaultValue={1}
        />
        <Input
          label="Brand (Optional)"
          name="brand"
          register={register}
          error={errors.brand}
          placeholder="e.g., EcoWear"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-foreground mb-2">Story Snippet (Optional)</label>
        <textarea
          {...register('story_snippet')}
          rows={2}
          className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary"
          placeholder="A short story about the item's journey or impact."
        />
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit" variant="default" iconName="Upload" iconPosition="left" isLoading={isLoading}>
          {isLoading ? 'Publishing...' : 'Publish Listing'}
        </Button>
      </div>
    </form>
  );
};

export default CreateListingForm;
