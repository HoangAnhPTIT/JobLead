import { PlusOutlined } from "@ant-design/icons";
import { Image, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthPost } from "src/apis/apiAuthCaller";

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
const ImageInput = ({ imageUrl, apiUpdate, reload }) => {
	const [previewOpen, setPreviewOpen] = useState(false);
	const [previewImage, setPreviewImage] = useState("");
	const [fileList, setFileList] = useState([]);

	console.log("fileList", fileList);

	const handleCancel = () => setPreviewOpen(false);

	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}
		setPreviewImage(file.url || file.preview);
		setPreviewOpen(true);
	};

	const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

	const uploadButton = (
		<button
			style={{
				border: 0,
				background: "none",
			}}
			type="button"
		>
			<PlusOutlined />
			<div
				style={{
					marginTop: 8,
				}}
			>
				Upload
			</div>
		</button>
	);

	useEffect(() => {
		setFileList([
			{
				uid: "-1",
				status: "done",
				url: imageUrl,
			},
		]);
	}, [imageUrl]);

	return (
		<>
			<Upload
				maxCount={1}
				accept="image/png, image/jpeg"
				listType="picture-card"
				fileList={fileList}
				onPreview={handlePreview}
				onChange={handleChange}
				customRequest={async ({ file }) => {
					const res = await httpAuthPost({
						contentType: "multipart/form-data",
						endpoint: apiUpdate,
						data: { file },
					});
					if (res.status === 200) {
						toast.success("Tải ảnh lên thành công");
						reload();
					} else {
						toast(res.message);
					}
				}}
			>
				{fileList.length > 0 ? null : uploadButton}
			</Upload>
			<Modal open={previewOpen} footer={null} onCancel={handleCancel}>
				<div className="text-center">
					<Image alt="example" src={previewImage} preview={false} />
				</div>
			</Modal>
		</>
	);
};
export default ImageInput;
