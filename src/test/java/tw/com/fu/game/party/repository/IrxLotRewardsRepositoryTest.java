//package tw.com.tradevan.petax.irxlot.repository;
//
//import lombok.extern.log4j.Log4j2;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.context.ActiveProfiles;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import tw.com.tradevan.petax.irxlot.entity.IrxLotRewardsId;
//import tw.com.tradevan.petax.irxlot.entity.IrxLotRewards;
//
//import java.time.LocalDateTime;
//
///**
// * @Author: 6582 DAVID.FU
// * @create-date: 2023/6/25 下午 11:40
// */
//@SpringBootTest
//@RunWith(SpringJUnit4ClassRunner.class)
//@Log4j2
////@WebMvcTest
//@AutoConfigureMockMvc
//@ActiveProfiles({ "dev" })
//public class IrxLotRewardsRepositoryTest {
//
//    @Autowired
//    IrxLotRewardsRepository repository;
//
//    /*
//    頭獎
//    貳獎
//    參獎
//    肆獎
//    伍獎
//    陸獎
//    普獎
//    普獎
//    普獎
//     */
//
//    @Test
//    public void initRewards(){
//
//        //網路報稅普獎
//        repository.save(
//                IrxLotRewards.builder()
//                        .irxLotRewardsId(IrxLotRewardsId.builder()
//                                .yr("112").rewardCd("G01").itemCd("07").build())
//                        .itemNm("普獎")
//                        .showRow("24")
//                        .sort(7)
//                        .quota(5000)
//                        .enableIconUrl("/party-games/assets/images/awards07.png")
//                        .disableIconUrl("/party-games/assets/images/awards07_atv.png")
//                        .createTime(LocalDateTime.now())
//                        .createAcc("admin")
//                        .build()
//        );
//
//
////        //網路報稅頭獎
////        repository.save(
////        IrxLotRewards.builder()
////                .irxLotCodeId(IrxLotCodeId.builder()
////                        .yr("112").rewardCd("G01").itemCd("01").build())
////                .itemNm("頭獎")
////                .showRow("11")
////                .sort(1)
////                .quota(1)
////                .enableIconUrl("/party-games/assets/images/awards01.png")
////                .disableIconUrl("/party-games/assets/images/awards01_atv.png")
////                .createTime(LocalDateTime.now())
////                .createAcc("admin")
////                .build()
////        );
////
////        //網路報稅貳獎
////        repository.save(
////                IrxLotRewards.builder()
////                        .irxLotCodeId(IrxLotCodeId.builder()
////                                .yr("112").rewardCd("G01").itemCd("02").build())
////                        .itemNm("貳獎")
////                        .showRow("12")
////                        .sort(2)
////                        .quota(2)
////                        .enableIconUrl("/party-games/assets/images/awards02.png")
////                        .disableIconUrl("/party-games/assets/images/awards02_atv.png")
////                        .createTime(LocalDateTime.now())
////                        .createAcc("admin")
////                        .build()
////        );
////
////        //網路報稅參獎
////        repository.save(
////                IrxLotRewards.builder()
////                        .irxLotCodeId(IrxLotCodeId.builder()
////                                .yr("112").rewardCd("G01").itemCd("03").build())
////                        .itemNm("參獎")
////                        .showRow("13")
////                        .sort(3)
////                        .quota(3)
////                        .enableIconUrl("/party-games/assets/images/awards03.png")
////                        .disableIconUrl("/party-games/assets/images/awards03_atv.png")
////                        .createTime(LocalDateTime.now())
////                        .createAcc("admin")
////                        .build()
////        );
////
////        //網路報稅肆獎
////        repository.save(
////                IrxLotRewards.builder()
////                        .irxLotCodeId(IrxLotCodeId.builder()
////                                .yr("112").rewardCd("G01").itemCd("04").build())
////                        .itemNm("肆獎")
////                        .showRow("21")
////                        .sort(4)
////                        .quota(10)
////                        .enableIconUrl("/party-games/assets/images/awards04.png")
////                        .disableIconUrl("/party-games/assets/images/awards04_atv.png")
////                        .createTime(LocalDateTime.now())
////                        .createAcc("admin")
////                        .build()
////        );
////
////        //網路報稅伍獎
////        repository.save(
////                IrxLotRewards.builder()
////                        .irxLotCodeId(IrxLotCodeId.builder()
////                                .yr("112").rewardCd("G01").itemCd("05").build())
////                        .itemNm("伍獎")
////                        .showRow("22")
////                        .sort(5)
////                        .quota(20)
////                        .enableIconUrl("/party-games/assets/images/awards05.png")
////                        .disableIconUrl("/party-games/assets/images/awards05_atv.png")
////                        .createTime(LocalDateTime.now())
////                        .createAcc("admin")
////                        .build()
////        );
////
////        //網路報稅陸獎
//        repository.save(
//                IrxLotRewards.builder()
//                        .irxLotRewardsId(IrxLotRewardsId.builder()
//                                .yr("112").rewardCd("G01").itemCd("06").build())
//                        .itemNm("陸獎")
//                        .showRow("23")
//                        .sort(6)
//                        .quota(800)
//                        .enableIconUrl("/party-games/assets/images/awards06.png")
//                        .disableIconUrl("/party-games/assets/images/awards06_atv.png")
//                        .createTime(LocalDateTime.now())
//                        .createAcc("admin")
//                        .build()
//        );
////
////        //網路報稅普獎
////        repository.save(
////                IrxLotRewards.builder()
////                        .irxLotCodeId(IrxLotCodeId.builder()
////                                .yr("112").rewardCd("G02").itemCd("91").build())
////                        .itemNm("普獎")
////                        .showRow("24")
////                        .sort(7)
////                        .quota(5000)
////                        .enableIconUrl("/party-games/assets/images/awards07.png")
////                        .disableIconUrl("/party-games/assets/images/awards07_atv.png")
////                        .createTime(LocalDateTime.now())
////                        .createAcc("admin")
////                        .build()
////        );
////
////        //手機報稅加碼獎 普獎
//        repository.save(
//                IrxLotRewards.builder()
//                        .irxLotRewardsId(IrxLotRewardsId.builder()
//                                .yr("112").rewardCd("G02").itemCd("91").build())
//                        .itemNm("普獎")
//                        .showRow("0")
//                        .sort(1)
//                        .quota(3000)
//                        .enableIconUrl("/party-games/assets/images/mobile.png")
//                        .disableIconUrl("/party-games/assets/images/mobile_atv.png")
//                        .createTime(LocalDateTime.now())
//                        .createAcc("admin")
//                        .build()
//        );
//
//        //E化繳退稅加碼獎  普獎
//        repository.save(
//                IrxLotRewards.builder()
//                        .irxLotRewardsId(IrxLotRewardsId.builder()
//                                .yr("112").rewardCd("G03").itemCd("92").build())
//                        .itemNm("普獎")
//                        .showRow("0")
//                        .sort(1)
//                        .quota(3000)
//                        .enableIconUrl("/party-games/assets/images/etax.png")
//                        .disableIconUrl("/party-games/assets/images/etax_atv.png")
//                        .createTime(LocalDateTime.now())
//                        .createAcc("admin")
//                        .build()
//        );
//
//
//    }
//
//
//
//}
