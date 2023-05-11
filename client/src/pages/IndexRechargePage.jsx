import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext.jsx";
import { Space, Table, Tag, Descriptions, Typography, Col, Divider, Row } from 'antd';
import support from "../assets/support.png";
import paypal from "../assets/paypal.jpg";

export default function IndexRechargePage() {
    const { Title } = Typography;
    const columns = [
        {
            title: 'Ngân hàng',
            dataIndex: 'bank',
            key: 'bank',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Chủ tài khoản',
            dataIndex: 'owner',
            key: 'owner',
        },
        {
            title: 'Số tài khoản',
            dataIndex: 'stk',
            key: 'stk',
        },
        {
            title: 'Chi nhánh',
            key: 'tags',
            dataIndex: 'tags',
            render: (_, { tags }) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'Hồ Chí Minh') {
                            color = 'green';
                        }
                        if (tag === 'Khánh Hòa') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag} className="mb-1">
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
    ];
    const data = [
        {
            key: '1',
            bank: 'VIETCOMBANK - NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN NGOẠI THƯƠNG VIỆT NAM',
            owner: 'Công ty TNHH Homeus',
            stk: '0071001050516',
            tags: ['Hồ Chí Minh', 'Khánh Hòa'],
        },
        {
            key: '2',
            bank: 'ACB - NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN Á CHÂU',
            owner: 'Công ty TNHH Homeus',
            stk: '150590888',
            tags: ['Đông Sài Gòn'],
        },
        {
            key: '3',
            bank: 'OCB - NGÂN HÀNG THƯƠNG MẠI CỔ PHẦN PHƯƠNG ĐÔNG',
            owner: 'Công ty TNHH Homeus',
            stk: '0031200510255',
            tags: ['Hồ Chí Minh', 'Khánh Hòa'],
        },
    ];

    return (
        <div className="pb-4 px-8 flex flex-col min-h-screen max-w-6xl mx-auto">
            <div style={{ justifyContent: 'center' }}>
                <div className="px-10 py-5">
                    <Title level={2}>Phương thức chuyển khoản</Title>
                    <div className="px-10 py-5 my-10 nap-tien-truc-tiep" style={{ backgroundColor: '#ffeeba', height: 'cover' }}>
                        <Title level={4}>Lưu ý quan trọng:</Title>
                        <p>- Nội dung chuyển tiền bạn vui lòng ghi đúng thông tin sau:</p>
                        <Title className="px-5" level={5}>"Homeus - Hoang Nhu Ngoc - 0937497677"</Title>
                        <p>Trong đó Hoang Nhu Ngoc là tên thành viên, 0937497677 là số điện thoại của bạn đăng ký trên website Homeus.vn.</p>
                        <p>Xin cảm ơn!</p>
                    </div>

                    <Table columns={columns} dataSource={data} />

                    <Title level={2}>Phương thức ví điện tử Paypal</Title>
                    <Row>
                        <Col className="" span={12}>
                            <p className="msg">!!! Bạn cần phải có tài khoản trên website Homeus.vn để thực hiện nạp tiền trực tuyến qua paypal</p>
                            <p className="msg">- Nếu chưa có tài khoản: Bấm vào <Link style={{ fontWeight: '700' }} to="/register">đây</Link> để đăng ký</p>
                            <p className="msg">- Nếu đã là thành viên của Homeus nhấn vào <Link style={{ fontWeight: '700' }} to="/account/recharge">đây</Link> để bắt đầu nạp tiền thông qua ví điện tử paypal</p>
                        </Col>
                        <Col span={12}>
                            <img className="center-paypal" src={paypal} alt="paypal" />
                        </Col>
                    </Row>


                </div>
            </div>
            <section className="mx-5 section section-support" style={{ textAlign: 'center', justifyContent: 'center' }}>
                <Title level={3}>Liên hệ với chúng tôi nếu bạn cần hỗ trợ</Title>
                <img className="center" src={support} alt="support" />
                <Row className="my-10">
                    <Col span={6}>
                        <span class="support-item-title">Hỗ trợ đăng tin 1</span>
                        <a className="support-item" rel="nofollow" href="tel:0937497677">Điện thoại: 0937497677</a>
                        <a className="support-item" rel="nofollow" href="https://zalo.me/0937497677">Zalo: 0937497677</a>
                    </Col>
                    <Col span={6}>
                        <span class="support-item-title">Hỗ trợ đăng tin 2</span>
                        <a className="support-item" rel="nofollow" href="tel:0937497677">Điện thoại: 0937497677</a>
                        <a className="support-item" rel="nofollow" href="https://zalo.me/0937497677">Zalo: 0937497677</a>
                    </Col>
                    <Col span={6}>
                        <span class="support-item-title">Giao dịch trực tiếp 1</span>
                        <a className="support-item" rel="nofollow" href="tel:0937497677">Điện thoại: 0937497677</a>
                        <p className="support-item">MM4 Trường Sơn P15 Q10 TPHCM</p>
                    </Col>
                    <Col span={6}>
                        <span class="support-item-title">Giao dịch trực tiếp 2</span>
                        <a className="support-item" rel="nofollow" href="tel:0937497677">Điện thoại: 0937497677</a>
                        <a className="support-item" rel="nofollow" href="https://zalo.me/0937497677">Zalo: 0937497677</a>
                    </Col>
                </Row>
            </section>


        </div>
    );
}