
export const genFormData = (result) => {
    let bodyFormData = new FormData();

    bodyFormData.append('ban', result.ban);
    bodyFormData.append('uuid', result.uuid);
    bodyFormData.append('mode', result.mode);

    bodyFormData.append('achievement', result.achievement);
    bodyFormData.append('demoUrl', result.demoUrl);
    bodyFormData.append('discountPlan', result.discountPlan);
    bodyFormData.append('feature', result.feature);
    bodyFormData.append('flexibleScheduling', result.flexibleScheduling);
    bodyFormData.append('iaasPaas', result.iaasPaas);
    bodyFormData.append('infoSecurity', result.infoSecurity);
    bodyFormData.append('intro', result.intro);
    bodyFormData.append('loadBalance', result.loadBalance);
    bodyFormData.append('marketingPlan', result.marketingPlan);
    bodyFormData.append('massiveCal', result.massiveCal);
    bodyFormData.append('massiveConn', result.massiveConn);
    bodyFormData.append('moreInfo', result.moreInfo);
    bodyFormData.append('pictureDesc', result.pictureDesc);
    bodyFormData.append('portablePlan', result.portablePlan);
    bodyFormData.append('serviceAreaList', result.serviceAreaList);
    bodyFormData.append('serviceAreaO', result.serviceAreaO);
    bodyFormData.append('serviceLimit', result.serviceLimit);
    bodyFormData.append('solutionEName', result.solutionEName);
    bodyFormData.append('solutionName', result.solutionName);
    bodyFormData.append('spec', result.spec);
    bodyFormData.append('succCase', result.succCase);
    bodyFormData.append('suitableIndustryList', result.suitableIndustryList);
    bodyFormData.append('suitableIndustryO', result.suitableIndustryO);
    bodyFormData.append('suitableScaleList', result.suitableScaleList);
    bodyFormData.append('uninterruptedService', result.uninterruptedService);
    bodyFormData.append('tags', result.tagsList);
    bodyFormData.append('tagsAdm', result.tagsAdmList);
    bodyFormData.append('otherSpec', result.otherSpec);
    bodyFormData.append('solDesc', result.solDesc);
    if ( result.cate1 ) {
        bodyFormData.append('cate1', result.cate1);
    }
    if ( result.cate2 ) {
        bodyFormData.append('cate2', result.cate2);
    }
    if ( result.cate3 ) {
        bodyFormData.append('cate3', result.cate3);
    }
    if ( result.cate4 ) {
        bodyFormData.append('cate4', result.cate4);
    }
    if ( result.cate5 ) {
        bodyFormData.append('cate5', result.cate5);
    }
    if ( result.cate6 ) {
        bodyFormData.append('cate6', result.cate6);  
    }  

    //TODO 檔案上傳透過另一隻API做
    // if ( result.pictureFile ) {
    //     bodyFormData.append('pictureFile', result.pictureFile  , result.pictureFile.name );
    // }
    // if ( result.achievementFile ) {
    //     bodyFormData.append('achievementFile', result.achievementFile  , result.achievementFile.name );
    // }
    // if ( result.iaasPaasFile ) {
    //     bodyFormData.append('iaasPaasFile', result.iaasPaasFile  , result.iaasPaasFile.name );
    // }
    // if ( result.otherDocs ) {
    //     bodyFormData.append('otherDocs', result.otherDocs  , result.otherDocs.name );
    // }
    

    if ( (result.specName0 || result.price0) && result.solutionSpecCount > 0 ) {
        bodyFormData.append('specUuid0', result.specUuid0);
        bodyFormData.append('specName0', result.specName0 );
        bodyFormData.append('price0', result.price0 );
        bodyFormData.append('period0', result.period0 );
        bodyFormData.append('numData0', result.numData0 );
        bodyFormData.append('numClient0', result.numClient0 );
    }
    if ( (result.specName1 || result.price1) && result.solutionSpecCount > 1  ) {
        bodyFormData.append('specUuid1', result.specUuid1);
        bodyFormData.append('specName1', result.specName1 );
        bodyFormData.append('price1', result.price1 );
        bodyFormData.append('period1', result.period1 );
        bodyFormData.append('numData1', result.numData1 );
        bodyFormData.append('numClient1', result.numClient1 );
    }
    if ( (result.specName2 || result.price2) && result.solutionSpecCount > 2  ) {
        bodyFormData.append('specUuid2', result.specUuid2);
        bodyFormData.append('specName2', result.specName2 );
        bodyFormData.append('price2', result.price2 );
        bodyFormData.append('period2', result.period2 );
        bodyFormData.append('numData2', result.numData2 );
        bodyFormData.append('numClient2', result.numClient2 );
    }
    if ( (result.specName3 || result.price3) && result.solutionSpecCount > 3  ) {
        bodyFormData.append('specUuid3', result.specUuid3);
        bodyFormData.append('specName3', result.specName3 );
        bodyFormData.append('price3', result.price3 );
        bodyFormData.append('period3', result.period3 );
        bodyFormData.append('numData3', result.numData3 );
        bodyFormData.append('numClient3', result.numClient3 );
    }
    if ( (result.specName4 || result.price4) && result.solutionSpecCount > 4  ) {
        bodyFormData.append('specUuid4', result.specUuid4);
        bodyFormData.append('specName4', result.specName4 );
        bodyFormData.append('price4', result.price4 );
        bodyFormData.append('period4', result.period4 );
        bodyFormData.append('numData4', result.numData4 );
        bodyFormData.append('numClient4', result.numClient4 );
    }
    // tag: ""
    return bodyFormData;
  };