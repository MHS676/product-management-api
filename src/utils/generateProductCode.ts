import crypto from "crypto";

export const generateProductCode = (productName: string): string => {
    const hashedValue = crypto.createHash("md5").update(productName).digest("hex").slice(0, 8);

    const getIncreasingSubstrings = (str: string) => {
        let substrings: string[] = [];
        let temp = "";

        for (let i = 0; i < str.length; i++) {
            if (temp === "" || str[i] >= temp[temp.length - 1]) {
                temp += str[i];
            } else {
                substrings.push(temp);
                temp = str[i];
            }
        }
        substrings.push(temp);

        return substrings;
    };

    const lowerCaseName = productName.toLowerCase();
    const substrings = getIncreasingSubstrings(lowerCaseName);
    const maxLength = Math.max(...substrings.map((s) => s.length));
    const longestSubstrings = substrings.filter((s) => s.length === maxLength).join("");

    const startIndex = lowerCaseName.indexOf(longestSubstrings[0]);
    const endIndex = startIndex + longestSubstrings.length - 1;

    return `${hashedValue}-${startIndex}${longestSubstrings}${endIndex}`;
};
