import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



//中獎清單
const PaListDiv = ({show, drowResult = [], rewards = {}, closePaListDiv ,plListPdfDownload}) => {
    
    if(show){
        console.log(rewards);
    }
    
    return show?(
    <>
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            <h1 className="modal-title fs-4" id="exampleModalLabel">{rewards.groupNm + "  "+ rewards.itemNmTittle + "  " +rewards.itemNm + "  "+ rewards.quota+"名"}     { /* 網路報稅獎 伍獎 獎金5千元 20名 */}</h1>
        </Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
        <div className="rim">
            <div className="edit-form">
                <div className="table-responsive has-foot">
                    <table className="table tb-multi">
                        <thead>
                            <tr>
                                <th scope="col">序號</th>
                                <th scope="col">檔案編號</th>
                                <th scope="col">戶籍縣市</th>
                                <th scope="col">身分證統一編號</th>
                                <th scope="col">姓名</th>
                            </tr>
                        </thead>
                        <tbody>
                            {drowResult.map((data, index) => {
                                return (
                                    <tr>
                                        <td scope="row" data-title="序號"><span>{data.serialNo}</span></td>
                                        <td scope="row" data-title="檔案編號"><span>{data.fileNumber}</span></td>
                                        <td className="lt" data-title="戶籍縣市"><span>{data.addr}</span></td>
                                        <td data-title="身分證統一編號"><span>{data.idn}</span></td>
                                        <td className="lt" data-title="姓名"><span>{data.taxpayerName}</span></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Modal.Body>
    <Modal.Footer>
        <button onClick={closePaListDiv} type="button" className="btn modal_btn rounded-pill btn-lg" data-bs-dismiss="modal">關閉</button>
        {/* <button onClick={()=>{ plListPdfDownload(rewards);}} type="button" className="btn rounded-pill btn-lg modal_btn" data-bs-toggle="modal" data-bs-target="#pa_list">下載名單</button> */}
    </Modal.Footer>
    </>
    ):(<></>);
};
export default PaListDiv;