"use client";
import { LikeOutlined, WarningTwoTone } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Radio, Row, Space, Spin } from "antd";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPost } from "src/apis/apiAuthCaller";
import {
	apiCandidate,
	apiCandidateApplyJob,
	apiCandidateCv,
	apiCandidateInfo,
} from "src/apis/apiEndpoint";
import { errorMessage } from "src/constants/common";
import routeMap from "src/constants/routeMap";

const ModalApplyJob = ({ data, showModal, setShowModal }) => {
	const dispatch = useAppDispatch();
	const { isLoading } = useAppSelector((state) => state.loading);
	const [cvList, setCvList] = useState(null);
	const [cvSelected, setCvSelected] = useState(null);
	const [form] = Form.useForm();

	const onSelectCv = (e) => {
		setCvSelected(e.target.value);
	};

	const onCreateCv = () => {
		window.open(`${routeMap.file}${routeMap.cv}/pro`);
		setShowModal(false);
	};

	const onViewCv = (e, code) => {
		e.preventDefault();
		window.open(`${routeMap.file}${routeMap.cv}${routeMap.edit}/${code}`);
	};

	const onConfirmApply = async () => {
		dispatch(updateLoading(true));
		try {
			const response = await httpAuthPost({
				endpoint: apiCandidateApplyJob,
				data: { jobId: data?.id || data?.jobId, cvId: cvSelected },
			});
			if (response.status === 200) {
				toast.success("Ứng tuyển thành công");
				setShowModal(false);
			} else {
				toast.error(errorMessage);
				console.error(response.message);
			}
		} catch (error) {
			console.error(error);
			toast.error(error.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		dispatch(updateLoading(true));
		try {
			const getCvList = async () => {
				const response = await httpAuthGet({ endpoint: apiCandidateCv });
				setCvList(response?.data);
			};
			const getInfo = async () => {
				const response = await httpAuthGet({ endpoint: apiCandidate });
				form.setFieldsValue({
					phone: response?.data?.phone,
					email: response?.data?.email,
				});
			};
			getCvList();
			getInfo();
		} catch (error) {
			console.error(error);
			toast.error(error.message || error);
		} finally {
			dispatch(updateLoading(false));
		}
	}, [dispatch, form]);

	return (
		<Modal
			open={showModal}
			onCancel={() => setShowModal(false)}
			title="Nộp hồ sơ ứng tuyển"
			okButtonProps={{ disabled: !cvSelected }}
			onOk={onConfirmApply}
			width={750}
		>
			<Spin spinning={isLoading}>
				{isEmpty(cvList) ? (
					<div className="text-center">
						<p className="text-xl my-5">Bạn chưa có CV?</p>
						<p>
							<Button type="primary" danger onClick={onCreateCv}>
								Tạo CV ngay
							</Button>
						</p>
					</div>
				) : (
					<div className="text-33">
						<Form form={form} layout="vertical">
							<div className="text-base">
								<strong>Bạn đang ứng tuyển vào vị trí: </strong>
								<span className="text-primary">{data?.name}</span>
							</div>
							<div className="border bg-primary text-white py-2 px-5 my-4">
								Ứng tuyển bằng CV mẫu
							</div>
							<div className="border rounded-lg p-4 mb-5 bg-[#fffdf3]">
								<p>
									Chọn CV mẫu:
									<span className="text-blue-600 ml-2">
										<LikeOutlined />
										Khuyên dùng
									</span>
								</p>
								<Radio.Group
									onChange={onSelectCv}
									value={cvSelected}
									className="!py-2"
								>
									<Space direction="vertical" className="w-full">
										{cvList?.map((item, i) => (
											<div className="p1-2" key={i}>
												<Radio value={item?.id}>
													{item?.name}
													<span
														className="ml-2 text-primary"
														onClick={(e) => onViewCv(e, item?.templateCode)}
													>
														(Xem)
													</span>
												</Radio>
											</div>
										))}
									</Space>
								</Radio.Group>
							</div>
							<div className="border rounded-lg p-4 mb-5 bg-[#fffdf3]">
								<p className="font-semibold text-base">
									Xác định thông tin liên hệ.
								</p>
								<div className="my-3">
									<p>
										Vui lòng xác nhận các thông tin dưới đây để nhà tuyển dụng
										có thể tìm thấy bạn.
									</p>
									<p>Các thay đổi sẽ cập nhật vào hồ sơ</p>
								</div>
								<Row gutter={16}>
									<Col span={12}>
										<Form.Item name="phone" label="Số điện thoại">
											<Input placeholder="Số điện thoại" size="large" />
										</Form.Item>
									</Col>
									<Col span={12}>
										<Form.Item name="email" label="Email">
											<Input placeholder="Email" size="large" />
										</Form.Item>
									</Col>
								</Row>
								<div>
									<p>
										<WarningTwoTone twoToneColor="#FFBF00	" />
										<strong className="ml-2">Xin nhắc nhở:</strong>
									</p>
									<p>
										Hiện nay có một số người mạo danh nhà tuyển dụng đã bị báo
										cáo về hành vi lừa đảo. Họ yêu cầu ứng viên phải trả phí
										thông qua việc tải về một ứng dụng và hoàn thành các nhiệm
										vụ,…
									</p>
									<p>
										<strong>Lưu ý:</strong> Khi ứng tuyển việc làm, các ứng viên{" "}
										<strong>
											không phải chi trả hoặc ứng bất cứ khoản phí nào
										</strong>
										. Xin cảm ơn!
									</p>
								</div>
							</div>
							<div>
								<strong>Thư giới thiệu:</strong>
								<Form.Item name="introduce">
									<Input.TextArea />
								</Form.Item>
							</div>
						</Form>
					</div>
				)}
			</Spin>
		</Modal>
	);
};

export default ModalApplyJob;
