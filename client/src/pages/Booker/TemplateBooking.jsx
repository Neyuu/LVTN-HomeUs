import {useReactToPrint} from "react-to-print";
import { useNavigate } from "react-router-dom";
import { useRef,useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { formatCurrentVND, getCurrentDate } from "../../util/util";
import axios from "axios";

const TemplateBooking = () => {
  const [detail, setDetail] = useState();
    const navigate = useNavigate();
  const ref = useRef();
  
  const { id } = useParams();

  const { month, day, year } = getCurrentDate();

  useEffect(() => {
    new Promise(async () => {
      await fetchRoom();
    });
  }, []);

  const fetchRoom = async () => {
    try {
      const res = await axios.get(`/get-list-detail-booker/${id}`);
      if (res.status === 200) {
        setDetail(res.data.data);
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

    const handlePrint = useReactToPrint({
        content : ()=> ref.current,
        documentTitle: 'Biên bản hợp đồng',
        pageStyle:"print",
        onAfterPrint: ()=> navigate(-1)
    })
  
  console.log('====================================');
  console.log(detail);
  console.log('====================================');


    return (
        <div className="bg-white shadow rounded-lg p-10 px-6 py-4" ref={ref}>
        <div className="bot-content css-content">
          <p style={{ textAlign: "center" }}>
            <span
              style={{
                fontFamily: "verdana, geneva, sans-serif",
                fontSize: "16px",
              }}
            >
              <strong>CỘNG HOÀ XÃ HỘI CHỦ NGHĨA VIỆT NAM</strong>
            </span>
            <br />
            <span
              style={{
                fontFamily: "verdana, geneva, sans-serif",
                fontSize: "16px",
              }}
            >
              <strong> Độc lập – Tự do – Hạnh phúc</strong>
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              ---------o0o---------
            </span>
          </p>
          <p style={{ textAlign: "center" }}>
            <span
              style={{
                fontFamily: "verdana, geneva, sans-serif",
                fontSize: "16px",
              }}
            >
              <strong>HỢP ĐỒNG THUÊ NHÀ&nbsp;</strong>
            </span>
            <br />
            <span
              style={{
                fontFamily: "verdana, geneva, sans-serif",
                fontSize: "16px",
              }}
            >
              <strong> SỬ DỤNG ĐẤT VÀ SỞ HỮU NHÀ</strong>
            </span>
          </p>
          <p style={{ textAlign: "left" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              Hôm nay, ngày …{day}… tháng …{month}…… năm ……{ year}……
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              Chúng tôi gồm:
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              I/ BÊN BÁN/CHUYỂN NHƯỢNG&nbsp;(sau đây gọi tắt&nbsp;Bên A):
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
               Ông..............{detail?.place?.owner?.name}.................................
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              Email
              ..................{detail?.place?.owner?.email}.........................
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              Đăng ký thường trú tại
              :..............................……………….........................................................
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              II/ BÊN MUA/NHẬN CHUYỂN NHƯỢNG&nbsp;(sau đây gọi tắt&nbsp;Bên B):
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              Ông....................{detail?.user?.name}...........................
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              Email.............{detail?.user?.email}......................
              
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              Đăng ký thường trú tại
              :..............................……………….........................................................
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              Hai bên thoả thuận, tự nguyện cùng nhau lập và ký bản hợp đồng này
              để thực
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              hiện việc mua bán chuyển nhượng quyền sử dụng đất và sở hữu nhà ở
              với những điều
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              khoản sau
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              <strong>Điều 1.&nbsp;Đối tượng của hợp đồng</strong>
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              1. Đối tượng của hợp đồng này là ngôi nhà: ……....<b>{detail?.place?.title}</b>.......&nbsp;quận/huyện/tỉnh.............<b>{detail?.place?.address}</b>............. có thực trạng như sau :
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              2. Nhà thuê :
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              - Tổng diện tích sử dụng: ………………………{detail?.place?.areas}………………..m<sup>2</sup>
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              - Số phòng ngủ: …………………………{detail?.place?.numberBed}……………………..m<sup>2</sup>
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              - Dịch vụ sẵn có: …………{detail?.place?.perks.length > 0 && detail?.place?.perks.toString()}
            
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              - Hình thức sử dụng riêng: ………………………………………….m<sup>2</sup>
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              4. Các thực trạng
              khác:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              (phần diện tích nằm ngoài chủ quyền; diện tích vi phạm quy hoạch,
              trong đó phần diện tích trong lộ giới)
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              5. Ông&nbsp;……………………………..và Bà.............................là chủ
              sở hữu nhà ở và sử dụng đất ở nêu trên theo giấy chứng nhận quyền
              sở hữu&nbsp;nhà ở và quyền sử dụng đất ở số……ngày.....
              tháng......năm.....
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              Do …………………………………………………………………….cấp&nbsp;
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              <strong>Điều 2</strong>: &nbsp;
              <strong>
                Giá cả, phương thức thanh toán và thời hạn thực hiện
              </strong>
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              1.Giá thuê cho dịch vụ {
                detail?.typeOption === 'longTerm' ? (
                  <>
                    Dài hạn - 
                  {formatCurrentVND(detail?.place?.packageLong?.price)}
                  </>
                ): (
                  <>
                  Ngắn hạn - 
                {formatCurrentVND(detail?.place?.packageLong?.price)}
                </>
                )
              }
             
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              (Ghi bằng
              chữ:.................................................................)
              và không thay đổi vì bất cứ lý do gì.
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              2. Phương thức thanh toán:
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              Hai bên (Bên A và Bên B) đã cùng thống nhất sẽ thực hiện việc
              thanh toán tổng giá trị mua bán&nbsp;
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              Nhà đất ở theo 01 đợt, cụ thể như sau:
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              * Đợt 1: 
              {
                detail?.typeOption === 'longTerm' ? (
                  <>
                   <b> Dài hạn  
                  {detail?.place?.packageLong.longPackageDate}</b>
                  </>
                ): (
                  <>
                 <b> Ngắn hạn - 
                {detail?.place?.packageLong.shortPackageDateStart} - {detail?.place?.packageLong.shortPackageDateEnd}</b>
                </>
                )
              }
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              * Khi trả tiền sẽ ghi giấy biên nhận do các bên cùng ký xác nhận.
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              <strong>Điều 3.&nbsp;Cam kết của các bên</strong>
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              Bên bán và Bên mua chịu trách nhiệm trước pháp luật về những lời
              cam kết sau đây:
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              1. Bên bán cam kết :
            </span>
          </p>
          <ul style={{ textAlign: "justify" }}>
            <li>
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "verdana, geneva, sans-serif",
                }}
              >
                Hỗ trợ, phối hợp và tạo điều kiện thuận lợi để hai bên cùng tiến
                hành các thủ tục hành chính pháp lý cần thiết khi thực hiện việc
                chuyển giao quyền sở hữu nhà theo qui định của pháp luật.
              </span>
            </li>
            <li>
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "verdana, geneva, sans-serif",
                }}
              >
                Bảo quản căn nhà đã bán trong thời gian chưa bàn giao nhà cho
                bên mua.
              </span>
            </li>
            <li>
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "verdana, geneva, sans-serif",
                }}
              >
                Bàn giao nhà và các thiết bị cho Bên B đúng thời hạn. Cung cấp
                cho bên B tất cả các chi tiết liên quan đến nhà bán (hồ sơ công
                trình phụ, hệ thống điện, nước, phòng cháy chữa cháy, camera
                quan sát…)
              </span>
            </li>
            <li>
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "verdana, geneva, sans-serif",
                }}
              >
                Cam kết căn nhà thuộc quyền sở hữu hợp pháp của mình, không bị
                tranh chấp và không bị ràng buộc bởi nghĩa vụ pháp lý với bất kỳ
                bên thứ ba nào khác tại thời điểm mua bán.
              </span>
            </li>
            <li>
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "verdana, geneva, sans-serif",
                }}
              >
                Có quyền không giao nhà nếu bên B không thực hiện nghĩa vụ thanh
                toán đúng thời hạn đã thỏa thuận.
              </span>
            </li>
            <li>
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "verdana, geneva, sans-serif",
                }}
              >
                Yêu cầu bên B thanh toán tiền mua nhà đúng theo thời gian đã
                thỏa thuận.
              </span>
            </li>
            <li>
              <span
                style={{
                  fontSize: "16px",
                  fontFamily: "verdana, geneva, sans-serif",
                }}
              >
                Các quyền và nghĩa vụ khác của bên bán nhà ( ngoài những điều
                nêu trên) theo qui định tại Bộ luật dân sự và Luật nhà ở.
              </span>
            </li>
          </ul>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              2. Bên mua cam kết:
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              - Nhận giấy tờ sở hữu nhà và nhận bàn giao nhà đúng hạn và phù hợp
              với tình trạng được nêu tại hợp đồng mua bán nhà.
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              - Trả tiền mua nhà theo đúng thỏa thuận. Nếu chậm thanh toán thì
              phải chịu trả thêm tiền lãi như đã thỏa thuận.
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              - Yêu cầu bên bán hỗ trợ, tạo điều kiện thuận lợi trong việc hoàn
              tất thủ tục chuyển giao quyền sở hữu nhà theo qui định của pháp
              luật.
            </span>
            <br />
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              {" "}
              - Các quyền và nghĩa vụ khác của bên mua nhà (ngoài những điều nêu
              trên) theo qui định tại Bộ luật dân sự và luật Nhà ở.&nbsp;
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              3. Hai bên cùng cam kết:
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              - &nbsp;Đã khai đúng sự thật và tự chịu trách nhiệm về tính chính
              xác của những thông tin về nhân thân đã ghi trong hợp đồng;
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              - Kể từ ngày ký hợp đồng này, không bên nào được sử dụng bản chính
              “Giấy chứng nhận quyền sở hữu nhà ở và quyền sử dụng đất
              ở”&nbsp;số
              ………...ngày………...tháng...........năm……....do&nbsp;……………………………….cấp
              cho Ông ………………………&nbsp;và vợ là
              Bà............................................
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              để thực hiện thế chấp, bảo lãnh, mua bán, tặng cho, trao đổi, kê
              khai làm vốn doanh nghiệp hoặc các giao dịch khác với bất kỳ hình
              thức nào cho đến khi hoàn thành thủ tục đăng ký quyền sở hữu.
            </span>
          </p>
          <p style={{ textAlign: "justify" }}>
            <span
              style={{
                fontSize: "16px",
                fontFamily: "verdana, geneva, sans-serif",
              }}
            >
              - Thực hiện đúng và đầy đủ các nội dung đã thỏa thuận trong hợp
              đồng; nếu bên nào vi phạm mà gây thiệt hại, thì phải bồi thường
              cho bên kia hoặc cho người thứ ba (nếu có).
            </span>
          </p>
          <table style={{ width: "1200px" }}>
            <tbody>
              <tr>
                <td style={{ width: "615px", textAlign: "center" }}>
                  <p>
                    <span
                      style={{
                        fontFamily: "verdana, geneva, sans-serif",
                        fontSize: "16px",
                      }}
                    >
                      <strong>BÊN A</strong>
                    </span>
                  </p>
                  <p>
                    <span
                      style={{
                        fontFamily: "verdana, geneva, sans-serif",
                        fontSize: "16px",
                      }}
                    >
                      <em>(Ký, điểm chỉ và ghi rõ họ tên)</em>
                    </span>
                  </p>
                </td>
                <td style={{ width: "573px", textAlign: "center" }}>
                  <p>
                    <span
                      style={{
                        fontFamily: "verdana, geneva, sans-serif",
                        fontSize: "16px",
                      }}
                    >
                      <strong>BÊN B</strong>
                    </span>
                  </p>
                  <p>
                    <span
                      style={{
                        fontFamily: "verdana, geneva, sans-serif",
                        fontSize: "16px",
                      }}
                    >
                      <em>(Ký, điểm chỉ và ghi rõ họ tên)</em>
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
            </div>
            <button onClick={handlePrint} className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-full float-right">In hợp đồng</button>
      </div>
    )
} 

export default TemplateBooking