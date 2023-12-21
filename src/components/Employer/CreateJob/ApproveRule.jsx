import { CheckCircleOutlined } from "@ant-design/icons";
import { primaryColor } from "src/constants/common";
import RuleIndex from "./RuleIndex";

const ApproveRule = () => {
	return (
		<div className="bg-white p-5">
			<div className="text-center">
				<CheckCircleOutlined style={{ color: primaryColor, fontSize: 40 }} />
			</div>
			<h4 className="uppercase text-xl text-center font-semibold my-2">
				Quy định duyệt tin
			</h4>
			<p>
				Quý khách vui lòng đọc kĩ quy định duyệt tin của Timviec.com.vn để đảm
				bảo tin đăng hợp lệ
			</p>
			<div className="my-5 text-33">
				<div className="flex gap-2.5 my-2">
					<RuleIndex index={1} />
					<div>
						<strong>KHÔNG</strong> viết in hoa hoặc không dấu toàn bộ nội dung
						tin tuyển dụng.
					</div>
				</div>
				<div className="flex gap-2.5 my-2">
					<RuleIndex index={2} />
					<div>Tên, địa chỉ công ty phải ghi rõ ràng, đầy đủ.</div>
				</div>
				<div className="flex gap-2.5 my-2">
					<RuleIndex index={3} />
					<div>
						<strong>KHÔNG</strong> để cả nội dung tuyển dụng trong thông tin
						giới thiệu về công ty.
					</div>
				</div>
				<div className="flex gap-2.5 my-2">
					<RuleIndex index={4} />
					<div>
						Tiêu đề tin tuyển dụng: KHÔNG chứa các nội dung như: Tuyển gấp, hot,
						cần gấp, lương cao. <strong>KHÔNG</strong> sử dụng các ký tự đặc
						biệt: %@ $*...
					</div>
				</div>
				<div className="flex gap-2.5 my-2">
					<RuleIndex index={5} />
					<div>
						Tin <strong>KHÔNG</strong> được trùng với tin đăng trước còn hạn,
						hoặc ở một tài khoản khác của cùng một doanh nghiệp đã đăng trước
						đó.
					</div>
				</div>
				<div className="flex gap-2.5 my-2">
					<RuleIndex index={6} />
					<div>
						<strong>KHÔNG</strong> để email liên hệ, số điện thoại liên hệ,
						website công ty ở các phần nội dung yêu cầu hay mô tả công việc.
					</div>
				</div>
			</div>
		</div>
	);
};

export default ApproveRule;
