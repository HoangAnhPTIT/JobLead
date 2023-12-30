"use client";
import {
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { updateLoading } from "lib/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { httpAuthGet, httpAuthPost } from "src/apis/apiAuthCaller";
import { httpGet } from "src/apis/apiCaller";
import { apiCompany, apiCompanyContact, apiJob } from "src/apis/apiEndpoint";
import InputForm from "src/commons/FormInput/InputForm";
import MultipleSelectWithLabel from "src/commons/FormInput/MultipleSelectWithLabel";
import SelectWithLabel from "src/commons/FormInput/SelectWithLabel";
import ImageFull from "src/commons/Image";
import { companyId } from "src/constants/common";
import ApproveRule from "./ApproveRule";

const CreateJobContent = () => {
	const { register, control, handleSubmit, reset, setValue } = useForm();
	const { entities } = useAppSelector((state) => state.entity);
	const [serviceList, setServiceList] = useState([]);
	const dispatch = useAppDispatch();

	const onSubmit = async (values) => {
		dispatch(updateLoading(true));
		try {
			const bodyData = {
				serviceIds: values.services || [],
				job: {
					...values?.jobInfo,
					numOfRecruitment: Number(values?.jobInfo?.numOfRecruitment || 0),
					jobRequirement: {
						...values?.jobRequirement,
						submitDeadline: moment(
							values?.jobRequirement?.submitDeadline
						).format("YYYY-MM-DD"),
					},
					contactInfo: values?.contact,
				},
			};
			const response = await httpAuthPost({ endpoint: apiJob, data: bodyData });
			if (response?.status === 200) {
				toast.success("Đăng tin tuyển dụng thành công");
				reset();
			}
		} catch (error) {
			console.log(error);
		} finally {
			dispatch(updateLoading(false));
		}
	};

	useEffect(() => {
		const getServices = async () => {
			const response = await httpGet(
				`${apiCompany}/${companyId}/services/available`
			);
			response?.status === 200 && setServiceList(response?.data || []);
		};
		const getCompanyInfo = async () => {
			const response = await httpAuthGet({ endpoint: apiCompanyContact });
			response?.data && setValue({ ...response?.data });
		};
		getServices();
		getCompanyInfo();
	}, []);

	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={8}>
					<form className="w-full">
						<div className="p-5 bg-white">
							<div className="text-primary font-semibold uppercase">
								Thông tin công việc
							</div>
							<Grid container spacing={2} className="py-5">
								<Grid item xs={12}>
									<InputForm
										name={"jobInfo.name"}
										label="Vị trí tuyển dụng"
										helper="(Lưu ý: Vị trí tuyển dụng sẽ không được chỉnh sửa sau khi tin tuyển dụng được duyệt)"
										helperClass="!text-red2 italic"
										required
										register={register}
									/>
								</Grid>
								<Grid iGrid item xs={6}>
									<InputForm
										name={"jobInfo.code"}
										label="Mã số tuyển dụng"
										register={register}
									/>
								</Grid>
								<Grid iGrid item xs={6}>
									<InputForm
										name={"jobInfo.numOfRecruitment"}
										label="Số lượng tuyển dụng"
										required
										register={register}
									/>
								</Grid>
								<Grid iGrid item xs={6}>
									<SelectWithLabel
										name={"jobInfo.levelId"}
										label="Cấp bậc"
										required
										register={register}
										list={entities?.Level}
									/>
								</Grid>
								<Grid iGrid item xs={6}>
									<SelectWithLabel
										name={"jobInfo.typeOfWorkId"}
										label="Loại hình công việc"
										required
										register={register}
										list={entities?.TypeOfWork}
									/>
								</Grid>
								<Grid iGrid item xs={6}>
									<SelectWithLabel
										name={"jobInfo.salaryId"}
										label="Mức lương"
										required
										register={register}
										list={entities?.Salary}
									/>
								</Grid>
								<Grid item xs={6}>
									<FormControlLabel
										control={<Checkbox />}
										label="Phần trăm hoa hồng"
										{...register("jobInfo.isHasCommission")}
									/>
								</Grid>
								<Grid iGrid item xs={6}>
									<SelectWithLabel
										name={"jobInfo.workLocationId"}
										label="Địa điểm làm việc"
										required
										register={register}
										list={entities?.WorkLocation}
									/>
								</Grid>
								<Grid iGrid item xs={6}>
									<SelectWithLabel
										name={"jobInfo.careerId"}
										label="Ngành nghề"
										required
										register={register}
										list={entities?.Career}
									/>
								</Grid>
								<Grid iGrid item xs={12}>
									<FormControl>
										<TextField
											name={"jobInfo.description"}
											label="Mô tả công việc"
											multiline
											minRows={12}
											placeholder={`Gợi ý:
- Nhận đơn hàng qua mail.
- Tìm kiếm khách hàng mới cho công ty, chăm sóc khách hàng cũ của công ty.
- Tìm kiếm khai thác khách hàng tiềm năng.
- Đàm phán, thương lượng và chốt hợp đồng với khách hàng.
- Kiểm tra và theo dõi tình hình thanh toán của khách hàng.
- Liên hệ khách hàng để làm đơn đặt hàng , giao hàng.
- Các công việc hành chính khác khi có yêu cầu từ ban lãnh đạo.
- Chi tiết trao đổi tại buổi phỏng vấn.`}
											{...register("jobInfo.description", {
												required: true,
											})}
										/>
										<FormHelperText className="!text-red2 italic">
											(Lưu ý: Hãy mô tả chi tiết những đầu mục công việc để ứng
											viên có thể hiểu rõ hơn về yêu cầu của công ty bạn với vị
											trí này)
										</FormHelperText>
									</FormControl>
								</Grid>
								<Grid item xs={12}>
									<TextField
										fullWidth
										name={"jobInfo.benifitDescription"}
										label="Quyền lợi được hưởng"
										multiline
										minRows={10}
										placeholder={`Gợi ý:
- Lương cứng: 7 triệu – 10 triệu VNĐ/tháng.
- Lương thưởng cạnh tranh đầy hấp dẫn.
- Thời gian làm việc Từ thứ 2 đến sáng thứ 7.
- Được làm việc trong môi trường trẻ trung, năng động, được đào tạo các kỹ năng...
- Tham gia du lịch, team building cùng với công ty.
- Được học hỏi kinh nghiệm, nâng cao trình độ chuyên môn.
- Được hưởng các chế độ theo quy định của luật lao động và công ty.`}
									/>
								</Grid>
							</Grid>
						</div>
						<div className="p-5 mt-5 bg-white">
							<div className="uppercase text-primary font-semibold">
								Yêu cầu công việc
							</div>
							<div className="my-5">
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<SelectWithLabel
											name={"jobRequirement.experienceId"}
											label="Kinh nghiệm"
											required
											list={entities?.Experience}
											register={register}
										/>
									</Grid>
									<Grid item xs={6}>
										<SelectWithLabel
											name={"jobRequirement.degreeId"}
											label="Bằng cấp"
											required
											list={entities?.Degree}
											register={register}
										/>
									</Grid>
									<Grid item xs={6}>
										<SelectWithLabel
											name={"jobRequirement.genderId"}
											label="Giới tính"
											required
											list={entities?.Gender}
											register={register}
										/>
									</Grid>
									<Grid item xs={6}>
										<LocalizationProvider dateAdapter={AdapterMoment}>
											<Controller
												name={"jobRequirement.submitDeadline"}
												control={control}
												rules={{ required: true }}
												defaultValue={null}
												render={({ field }) => (
													<DatePicker
														{...field}
														label="Hạn nộp hồ sơ"
														format="DD/MM/YYYY"
														slotProps={{
															textField: {
																size: "small",
																fullWidth: true,
																required: true,
															},
														}}
													/>
												)}
											/>
										</LocalizationProvider>
									</Grid>
									<Grid item xs={6}>
										<SelectWithLabel
											name={"jobRequirement.languageId"}
											label="Ngôn ngữ hồ sơ"
											required
											list={entities?.Language}
											register={register}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											fullWidth
											name={"jobRequirement.requestDescription"}
											label="Yêu cầu công việc"
											multiline
											minRows={8}
											placeholder={`Gợi ý:
- Có kinh nghiệm là một lợi thế.
- Nhanh nhẹn, trung thực, giao tiếp tốt. Có tinh thần hòa đồng, cầu tiến, chịu áp lực và có trách nhiệm trong công việc.
- Biết sử dụng kỹ năng văn phòng như: word, excel...
- Độ tuổi từ 18-35 tuổi.
- Chăm chỉ, cẩn thận và sức khỏe tốt.
- Giao tiếp tốt, năng động.`}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											fullWidth
											name={"jobRequirement.requestDocumentAttachment"}
											label="Yêu cầu hồ sơ"
											multiline
											minRows={8}
											placeholder={`Gợi ý:
- Đơn xin việc hoặc CV xin việc.
- Sơ yếu lý lịch (có dán ảnh)
- Hộ khẩu.
- Chứng minh nhân dân.
- Giấy khám sức khỏe.
- Các bằng cấp có liên quan.`}
										/>
									</Grid>
								</Grid>
							</div>
						</div>
						<div className="p-5 mt-5 bg-white">
							<div className="uppercase text-primary font-semibold">
								Thông tin liên hệ
							</div>
							<div className="my-5">
								<Grid container spacing={2}>
									<Grid item xs={12}>
										<InputForm
											name={"contact.fullname"}
											label="Người liên hệ"
											required
											register={register}
										/>
									</Grid>
									<Grid item xs={6}>
										<InputForm
											name={"contact.email"}
											label="Email liên hệ"
											required
											register={register}
										/>
									</Grid>
									<Grid item xs={6}>
										<InputForm
											name={"contact.phone"}
											label="Số điện thoại liên hệ"
											required
											register={register}
										/>
									</Grid>
									<Grid item xs={12}>
										<InputForm
											name={"contact.address"}
											label="Địa điểm làm việc"
											required
											register={register}
										/>
									</Grid>
								</Grid>
							</div>
						</div>
						<div className="p-5 mt-5 bg-white">
							<div className="uppercase text-primary font-semibold">
								Chọn services
							</div>
							<div className="my-5">
								<div className="w-full">
									<MultipleSelectWithLabel
										name="services"
										label="Services"
										list={serviceList}
										register={register}
									/>
								</div>
							</div>
						</div>
						<div className="text-right mt-5">
							<Button
								variant="contained"
								onClick={handleSubmit((data) => onSubmit(data))}
								className="mt-5 bg-primary"
							>
								Đăng tuyển
							</Button>
						</div>
					</form>
				</Grid>
				<Grid item xs={4}>
					<ApproveRule />
					<ImageFull src="/kp2.jpg" alt="KPI" className="mt-5" />
				</Grid>
			</Grid>
		</div>
	);
};

export default CreateJobContent;
