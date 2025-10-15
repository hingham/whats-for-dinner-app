import { Cloudinary } from '@cloudinary/url-gen';

const cloudName = 'wfd';
// These are set in the cloundinary settings. Can add additional as needed
const cloudinaryUploadPreset = 'wfd_recipe_title_image';

// Create a Cloudinary instance and set your cloud name.
const cld = new Cloudinary({
  cloud: {
    cloudName: 'wfd',
  },
});

const getCloundinaryUrl = (publicId: string, path = '') => {
  const cFill = 'c_fill';
  // adjust these values to ensure a good quality image while keeping the resource size small
  const height = 'h_400';
  const width = 'w_400';

  // Notes on how to provide access control here: https://support.cloudinary.com/hc/en-us/articles/202519742-Can-I-allow-access-to-uploaded-images-only-for-authenticated-users
  // TLDR need server side / advanced account to truly restrict access
  const url = `https://res.cloudinary.com/wfd/image/upload/${cFill},${height},${width}/${path}${publicId}.jpeg`;
  return url;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadImageToCloudinary = async (file: File, publicId?: string): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryUploadPreset);

  if (publicId) {
    formData.append('public_id', publicId);
  }
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  try {
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    return await res.json();
  } catch (e) {
    console.error(e);
    return Promise.resolve('');
  }
};

export { cld, getCloundinaryUrl, uploadImageToCloudinary };
// https://res.cloudinary.com/wfd/image/upload/fresh-frozen-base/burrito-bowls-vegan-cashew-sauce.heic
// https://res.cloudinary.com/wfd/image/upload/burrito-bowls-vegan-cashew-sauce?_a=DAJCyJE+ZAA0
