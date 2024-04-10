import { Image } from "antd";
import classNames from "classnames";
import { imageDefault } from "src/constants/common";
import { responsiveContent } from "src/constants/css";
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const bankColor = "#e02329";

const domain_name = process.env.DOMAIN_NAME;

const feedbacks = [
	{
		avatar:
			"https://timviec.com.vn/storage/avatars/1280118/m7w9gx7pu7Rm4K2XZlF1HpD2Dtuzg5KlrMb651BQ.png",
		name: "Chu Ánh Tuyết",
		company: "SAPPORO VIETNAM",
		feedback: `" Chất lượng hồ sơ ứng viên của gói TVCV3 rất tốt, chỉ sau 1 tuần tuyển dụng trên ${domain_name}, tôi đã đạt được hiệu quả mong muốn. Ngoài ra chất lượng chăm sóc khách hàng rất tốt, nhân viên tư vấn nhiệt tình và có tâm. Cảm ơn ${domain_name}! "`,
		color: "#6730e3",
	},
	{
		avatar:
			"https://recruitment-storage.hn.ss.bfcplatform.vn/VDJSV2_photo-1555530740-3d67fab132ae.jfif",
		name: "Nguyễn Hoàng Tôn",
		company: "AMBITION VIETNAM",
		feedback: `" Tôi rất hài lòng với chất lượng gói TVCV1 trên website ${domain_name}, vừa tiết kiệm chi phí, vừa nhanh  hóng hiệu quả. Chắc chắn đây sẽ là lựa chọn đầu tiên của tôi mỗi khi có nhu cầu tuyển dụng. "`,
		color: "#74bb04",
	},
	{
		avatar:
			"https://timviec.com.vn/storage/avatars/1166121/HSiQrM61ySCo9Vcn00OimxLdp6wsAdR6SFwKx14l.png",
		name: "Hoàng Thu Ngân",
		company: "AnTechCo",
		feedback: `" ${domain_name} có nguồn CV đa dạng, số lượng ứng viên truy cập mỗi ngày khá
    lớn, cập nhật liên tục và thường xuyên nên HR có khả năng tiếp cận hiệu quả hơn. "`,
		color: "#fea31e",
	},
	{
		avatar:
			"https://timviec.com.vn/storage/avatars/1280046/Vzbl0EjKgJzAFSeupkaPc5WHn9toUw6gp6ObFKig.png",
		name: "Trương Văn Ngã",
		company: "Kim Tinh Group",
		feedback: `" Anh rất hài lòng về lượng hồ sơ ứng viên bất động sản bên em, dùng xong gói
    dịch vụ là vừa đủ tuyển được những nhân viên thích hợp. Lần tuyển dụng tới nếu
    cần anh anh sẽ liên hệ lại. "`,
		color: "#6730e3",
	},
];

const profesional = [
	`" Thay vì đăng tuyển tràn lan tin tuyển dụng trên các diễn đàn thì việc tạo tài khoản công ty và đăng tin tuyển dụng trên một trang chuyên nghiệp như ${domain_name} sẽ tiếp cận ứng viên có năng lực, trình độ thích hợp dễ dàng
  hơn, đồng thời hình ảnh công ty cũng trở nên chuyên nghiệp, đáng tin cậy hơn."`,
	`" Hướng đến tầm nhìn dài hạn, ${domain_name} không chỉ thể hiện mong muốn trở thành đối tác tuyển dụng ngắn hạn, mà còn gắn kết quá trình thành công hậu tuyển dụng, tạo kết nối bền vững và lâu dài hơn giữa ứng viên, doanh nghiệp và kênh tìm việc trực tuyến."`,
	`" Nhanh chóng, thuận tiện và dễ dàng chính là điều mà
  ${domain_name} mang tới cho Nhà tuyển dụng và Người tìm việc. "`,
	`" Tuyển dụng thành công chỉ là đích đến ngắn hạn, đồng
  hành trong hành trình giữ chân nhân tài cũng là một mục tiêu không kém phần quan trọng.
  ${domain_name} phải luôn không ngừng đổi mới, sáng tạo và cải tiến để duy trì điều này."`,
];

const LineDivider = () => <div className="bg-primary w-36 h-1 my-4 mx-auto" />;

const FeedbackOfUser = ({ info }) => {
	const { avatar, company, name, feedback, color } = info;
	return (
		<div
			className="border-t-4 rounded p-5  h-[280px] mb-10"
			style={{ borderColor: color, boxShadow: "1px 0 4px 2px rgba(0,0,0,.15)" }}
		>
			<div className="flex gap-5 text-33 items-center">
				<Image
					width={60}
					height={60}
					src={avatar || imageDefault}
					alt=""
					preview={false}
					className="rounded-full"
				/>
				<div>
					<h3 className="font-semibold text-base">{name}</h3>
					<h5 className="text-[15px]">{company}</h5>
				</div>
			</div>
			<div className="text-justify mt-4">{feedback}</div>
		</div>
	);
};

const MoreInfo = () => {
	return (
		<div>
			<div className="bg-[#f8f9fa] text-33 py-10 mt-10">
				<div className="text-center">
					<h1 className="text-2xl font-semibold">Hướng dẫn thanh toán</h1>
					<LineDivider />
					<h3 className="text-[15px]">
						Chúng tôi sẽ liên hệ với bạn để xác nhận thông tin kích hoạt dịch vụ
						<br />
						ngay sau khi nhận được thông báo chuyển khoản
					</h3>
				</div>
				<div className="rounded border border-dotted border-secondary bg-[#fff8ed] p-6 w-[555px] mx-auto flex gap-6 text-base mt-6 mb-4">
					<div>
						<Image
							src={imageDefault}
							width={100}
							height={100}
							preview={false}
							alt=""
						/>
					</div>
					<div style={{ color: bankColor }}>
						<h2 className="font-semibold">Ngân hàng ACB</h2>
						<h3 className="font-semibold mb-1">Chi nhánh: Đống Đa</h3>
						<h3>
							<span className="text-33">Chủ tài khoản:</span> Công ty TNHH
							{domain_name}
						</h3>
						<h3>
							<span className="text-33">Số tài khoản:</span> 123 456 789
						</h3>
						<h3>
							<span className="text-33">Nội dụng:</span> 4 So Cuoi Cua
							SĐT_Thanh-toan-goi-dich-vu
						</h3>
					</div>
				</div>
				<div className="text-center">
					<span className="font-semibold">Lưu ý</span>: Nội dung có thể bỏ qua
					ký tự đặc biệt như: @ . ,
					<br />
					Ví dụ: 5678_Thanh Toan_TVCV1
				</div>
			</div>
			<div>
				<div className="text-center py-10">
					<h1 className="text-2xl font-semibold">
						Khách hàng của {domain_name}
					</h1>
					<LineDivider />
					<h3 className="max-w-[500px] lg:max-w-none m-auto">
						Được tin dùng bởi hơn 100,000 khách hàng cá nhân và doanh nghiệp tại
						Việt Nam, {domain_name} không ngừng thay đổi
						<br />
						nhằm đáp ứng nhu cầu ngày càng cao của khách hàng trong các hoạt
						động tuyển dụng.
					</h3>
				</div>
				<div className={classNames(responsiveContent, "mb-10 px-3")}>
					<Swiper
						slidesPerView={1}
						spaceBetween={30}
						freeMode={true}
						pagination={{
							clickable: true,
						}}
						modules={[FreeMode, Pagination]}
						breakpoints={{
							900: {
								slidesPerView: 2,
							},
							1064: {
								slidesPerView: 3,
							},
						}}
					>
						{feedbacks.map((item, i) => (
							<SwiperSlide key={i} className="p-2">
								<FeedbackOfUser info={item} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
				<div className={responsiveContent}>
					<div className="text py-10">
						<h1 className="text-2xl font-semibold text-center">
							Chuyên gia nói về chúng tôi
						</h1>
						<LineDivider />
						<div>
							<Swiper
								slidesPerView={2}
								spaceBetween={30}
								freeMode={true}
								pagination={{
									clickable: true,
								}}
								modules={[FreeMode, Pagination]}
							>
								{profesional.map((item, i) => (
									<SwiperSlide key={i} className="p-2">
										<div
											className="h-[300px] sm:h-[250px] md:h-[200px] lg:h-[135px] p-4 mb-10"
											style={{
												boxShadow: "1px 0 4px 2px rgba(0,0,0,.15)",
											}}
										>
											{item}
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MoreInfo;
