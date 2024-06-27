import { PDF } from "../model/pdf_File.model.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const uploadFileService = async (body, file, logdInUser) => {
  const { filename, pagename } = body;
  const { path, originalname } = file;
  console.log("............", filename, pagename, path, originalname);

  if (!pagename || !filename) {
    throw new ApiError(400, "Please enter all the fields");
  }

  if (!file) {
    throw new ApiError(400, "Please upload a file");
  }

  const user = await User.findById({ _id: logdInUser._id });

  console.log("user", user);

  if (!user) {
    throw new ApiError(401, "Unauthorized user");
  }


  let filePath = path.substring(path.indexOf('public//') + 8);

  console.log(filePath, "/////////////////////////////////////////////////////////");

  const result = await PDF.create({
    name: filename,
    file_path: filePath,
    original_name: originalname,
    pagename: pagename,
    owner: user._id,
  });

  // console.log("result", result);
  return new ApiResponse(200, result, "File created successfully");
};

const getAllFiles = async (pagename) => {
  if (pagename) {
    const result = await PDF.find({ pagename: pagename }).sort({ created_at: -1 });
    if (result.length > 0) {
      return new ApiResponse(200, result, "File get successfully");
    }
    else {
      throw new ApiError(404, "File not found");
    }
  }

  const result = await PDF.find().sort({ created_at: -1 });
  return new ApiResponse(200, result, "File get successfully");
};

const deleteFile = async (id) => {
  if (!id) {
    throw new ApiError(402, "Please provide the required fields");
  }

  const result = await PDF.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(404, "File not found");
  }

  return new ApiResponse(200, result, "File deleted successfully");
};

export { uploadFileService, getAllFiles, deleteFile };
