const crypto = require("crypto");
const Product = require("../models/Product");

const generateProductCode = async (productName) => {
  if (!productName) throw new Error("Product name is required");

  const name = productName.toLowerCase();
  let longestSubstrings = [];
  let maxLen = 0;

  let start = 0;
  let temp = name[0];


  for (let i = 1; i <= name.length; i++) {
    if (i < name.length && name[i] > name[i - 1]) {
      temp += name[i];
    } else {
      if (temp.length > maxLen) {
        longestSubstrings = [{ substring: temp, start }];
        maxLen = temp.length;
      } else if (temp.length === maxLen) {
        longestSubstrings.push({ substring: temp, start });
      }
      start = i;
      temp = name[i];
    }
  }


  const combinedSubstring = longestSubstrings.map((s) => s.substring).join("");
  const startIndex = longestSubstrings[0].start;
  const endIndex = startIndex + combinedSubstring.length - 1;


  const hash = crypto.createHash("sha256").update(name).digest("hex").slice(0, 6);


  let productCode = `${hash}-${startIndex}${combinedSubstring}${endIndex}`;


  let existingProduct = await Product.findOne({ productCode });
  if (existingProduct) {
    productCode += "-" + Math.floor(Math.random() * 1000);
  }

  return productCode;
};

module.exports = { generateProductCode };
