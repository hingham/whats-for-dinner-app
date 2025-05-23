import { Cloudinary } from '@cloudinary/url-gen';

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

export { cld, getCloundinaryUrl };
// https://res.cloudinary.com/wfd/image/upload/fresh-frozen-base/burrito-bowls-vegan-cashew-sauce.heic
// https://res.cloudinary.com/wfd/image/upload/burrito-bowls-vegan-cashew-sauce?_a=DAJCyJE+ZAA0
