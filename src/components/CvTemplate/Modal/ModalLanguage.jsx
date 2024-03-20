import { EditFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Select, Spin } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthPut } from "src/apis/apiAuthCaller";
import { apiCandidateLanguageSkill } from "src/apis/apiEndpoint";
import { updateSuccessMessage } from "src/constants/common";
import { CV_MODAL_TYPES, IT_SKILLS, LANGUAGES } from "src/constants/cv";

const ModalLanguage = ({ data, modalType, closeModal }) => {
	const { isLoading } = useAppSelector((state) => state.loading);
	const dispatch = useAppDispatch();
	const [form] = Form.useForm();
	const { entities } = useAppSelector((state) => state.entity);
	const isThisModal = modalType === CV_MODAL_TYPES.language;

	const [skillList, setSkillList] = useState(LANGUAGES);
	const [isAddingSkill, setIsAddingSkill] = useState(false);
	const [newSkill, setNewSkill] = useState("");

	const onAddNewSkill = () => {
		if (newSkill) {
			skillList.push(newSkill);
			setNewSkill("");
			setIsAddingSkill(false);
		}
	};

	const onCancelAddSkill = () => {
		setNewSkill("");
		setIsAddingSkill(false);
	};

	const onSubmit = async () => {
		dispatch(updateLoading(true));
		try {
			const values = await form.validateFields();
			const payload = Object.entries(values).map((keyValue) => ({
				name: keyValue[0],
				star: Number(keyValue[1]),
			}));
			const payloadValidated = payload.filter((item) => Boolean(item.star));

			const response = await httpAuthPut({
				endpoint: apiCandidateLanguageSkill,
				data: payloadValidated,
			});
			if (response.success) {
				toast.success(updateSuccessMessage);
				closeModal();
			}
		} catch (error) {
			toast.error(error?.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		if (data && isThisModal) {
			const formData = {
				...LANGUAGES.reduce(
					(list, item) => ({ ...list, [item]: undefined }),
					{}
				),
				...data.reduce(
					(list, item) => ({ ...list, [item?.name]: item?.star }),
					{}
				),
			};
			form.setFieldsValue(formData);
			setSkillList(Object.keys(formData));
		} else {
			form.resetFields();
		}
	}, [data, form, isThisModal]);

	return (
		<Modal
			open={isThisModal}
			onCancel={() => closeModal(false)}
			title="Kỹ năng tin học"
			className="p-0"
			width={550}
			onOk={onSubmit}
			okText="Lưu thông tin"
			confirmLoading={isLoading}
		>
			<Spin spinning={isLoading}>
				<Form
					form={form}
					autoComplete="off"
					labelAlign="left"
					colon={false}
					labelCol={{
						span: 12,
					}}
					wrapperCol={{
						span: 12,
					}}
				>
					{skillList.map((item, i) => (
						<Form.Item name={item} label={item} key={i}>
							<Select allowClear placeholder="Mức độ kĩ năng">
								{entities?.SkillLevel?.map((level, i) => (
									<Select.Option key={i} value={level?.order}>
										{level?.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
					))}
					{isAddingSkill ? (
						<Row>
							<Col span={10}>
								<Input
									placeholder="Tên kỹ năng"
									className="w-24"
									value={newSkill}
									onChange={(e) => setNewSkill(e.target.value)}
								/>
							</Col>
							<Col span={2} />
							<Col span={12}>
								<Button type="primary" onClick={onAddNewSkill}>
									Thêm
								</Button>
								<Button
									type="primary"
									danger
									onClick={onCancelAddSkill}
									className="ml-2"
								>
									Hủy
								</Button>
							</Col>
						</Row>
					) : (
						<div
							className="text-primary cursor-pointer w-fit"
							onClick={() => setIsAddingSkill(true)}
						>
							<EditFilled /> Thêm kỹ năng
						</div>
					)}
				</Form>
			</Spin>
		</Modal>
	);
};

export default ModalLanguage;
