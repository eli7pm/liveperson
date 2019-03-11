(function() {
    let state = document.readyState;
    if(state === 'interactive' || state === 'complete') {
        
        lpTag.events.bind({
            eventName: "VAR_ADDED",
            appName: "lp_sdes",
            func: function (data) {
                let eng=lpTag.taglets.rendererStub.getEngagementInfo(data.engId);
                let loc=window.location.href;
                let time=new Date();
                let sid=lpTag.taglets.lp_monitoringSDK.getSid();
                let serv;
                let custInfo;
                switch(data.type){
                        case('impDisplay'): console.log(`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()} Campaign: ${data.campaign} EngId: ${data.engId} Engagement Name: ${eng.engagementName} Page: ${loc} sessionId: ${sid}`);
                        break;
                        case('service'):
                        serv=lpTag.sdes.get('service');
                        for(let i=0;i<serv.length;i++){
                            console.log("Page Location:"+loc+" Service Activity: "+" Status: "+serv[i].service.serviceId+"Section: "+lpTag.section);  
                        }
                        break;
                        case('ctmrinfo'):
                        custInfo=lpTag.sdes.get('ctmrinfo')
                        for(let i=0;i<custInfo.length;i++){
                            console.log("Page Location:"+loc+" Customer Info: "+" Customer Id: "+custInfo[i].info.customerId+" Section: "+lpTag.section);
                        }
                        break;
                    default: return 0;
                }
            }
        });

    }
    else setTimeout(arguments.callee, 100);
})();