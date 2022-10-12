
const calenderMethods = {

    formatTime (time) {
        let arr = time.split('-');
        arr[0] = parseInt(arr[0].split(':')[0]);
        arr[1] = parseInt(arr[1].split(':')[0]);
        return arr;
    }
}

const privacyMethods = {

    calenderSortData (data) {
        data.forEach(dateItem => {
            let arr = [];
            dateItem.timeData.forEach(timeItem => {
                let timeStart = calenderMethods.formatTime(timeItem.duration_time)[0];
                let timeEnd = calenderMethods.formatTime(timeItem.duration_time)[1];
                let indexTemp = null;
                if(!arr.length) {
                    arr.push({
                        startTime: timeItem.startTime,
                        endTime: timeItem.endTime,
                        duration: timeItem.duration,
                        duration_time: timeItem.duration_time,
                        meetingData: [
                            timeItem
                        ]
                    })
                } else {
                    
                    let findItem = arr.every(meetingItem => {
                        let meetingStart = calenderMethods.formatTime(meetingItem.duration_time)[0];
                        let meetingEnd = calenderMethods.formatTime(meetingItem.duration_time)[1];
                        return (
                            (timeEnd <= meetingStart) || 
                            (timeStart >= meetingEnd)
                        );
                    })
                    if(findItem){
                        arr.push({
                            startTime: timeItem.startTime,
                            endTime: timeItem.endTime,
                            duration: timeItem.duration,
                            duration_time: timeItem.duration_time,
                            meetingData: [
                                timeItem
                            ]
                        })
                        return;
                    }
                    let eachFlag = false;
                    arr.forEach((meetingItem, index) => {
                        if(eachFlag){
                            return;
                        }
                        indexTemp = index;
                        let meetingStart = calenderMethods.formatTime(meetingItem.duration_time)[0];
                        let meetingEnd = calenderMethods.formatTime(meetingItem.duration_time)[1];
                        if(
                            (meetingStart
                            <= timeStart) && 
                            (timeStart
                            <= meetingEnd) && 
                            (meetingStart
                            <= timeEnd) && 
                            (timeEnd 
                            <= meetingEnd)
                        ){
                            eachFlag = true;
                            meetingItem.meetingData.push(timeItem);
                        }

                        
                        if(
                            (timeStart < meetingStart) && 
                            ((meetingStart < timeEnd) && 
                            (timeEnd <= meetingEnd))
                        ){
                            eachFlag = true;
                            meetingItem.startTime = timeItem.startTime;
                            meetingItem.duration = meetingEnd - timeStart;
                            meetingItem.duration_time = timeStart + ':00-' + meetingEnd + ':00';
                            meetingItem.meetingData.push(timeItem);
                        }

                        if(
                            (timeEnd > meetingEnd) && 
                            ((meetingStart <= timeStart) && 
                            (timeStart < meetingEnd))
                        ){
                            eachFlag = true;
                            meetingItem.endTime = timeItem.endTime;
                            meetingItem.duration = timeEnd - meetingStart;
                            meetingItem.duration_time = meetingStart + ':00-' + timeEnd + ':00';
                            meetingItem.meetingData.push(timeItem);
                        }

                        if(
                            (timeStart < meetingStart) && 
                            (timeEnd > meetingEnd)
                        ){
                            eachFlag = true;
                            meetingItem.startTime = timeItem.startTime;
                            meetingItem.endTime = timeItem.endTime;
                            meetingItem.duration = timeEnd - timeStart;
                            meetingItem.duration_time = timeStart + ':00-' + timeEnd + ':00';
                            meetingItem.meetingData.push(timeItem);
                        }

                    })
                }
                let arrTemp = [];
                let notCheckArr = [];
                if(indexTemp !== null){
                    let curItemStartTime = arr[indexTemp].startTime;
                    let curItemEndTime = arr[indexTemp].endTime;
                    let curItemStart = calenderMethods.formatTime(arr[indexTemp].duration_time)[0];
                    let curItemEnd = calenderMethods.formatTime(arr[indexTemp].duration_time)[1];
                    arr.forEach((item, index) => {
                        let itemStart = calenderMethods.formatTime(item.duration_time)[0];
                        let itemEnd = calenderMethods.formatTime(item.duration_time)[1];
                        if(index != indexTemp){
                            if(
                                (itemStart < curItemStart) && 
                                ((curItemStart < itemEnd) && 
                                (itemEnd <= curItemEnd))
                            ){
                                curItemStart = itemStart;
                                curItemStartTime = item.startTime;
                                arrTemp.push(item);
                                return;
                            }

                            if(
                                (itemEnd > curItemEnd) && 
                                ((curItemStart <= itemStart) && 
                                (itemStart < curItemEnd))
                            ){
                                curItemEnd = itemEnd;
                                curItemEndTime = item.endTime;
                                arrTemp.push(item);
                                return;
                            }

                            if(
                                (itemStart < curItemStart) && 
                                (itemEnd > curItemEnd)
                            ){
                                curItemStart = itemStart;
                                curItemEnd = itemEnd;
                                curItemStartTime = item.startTime;
                                curItemEndTime = item.endTime;
                                arrTemp.push(item);
                                return;
                            }
                            notCheckArr.push(item);
                        }
                    })
                    let selItem = [];
                    if(arrTemp.length){
                        arr[indexTemp].startTime = curItemStartTime;
                        arr[indexTemp].duration = curItemEnd - curItemStart;
                        arr[indexTemp].endTime = curItemEndTime;
                        arr[indexTemp].duration_time = curItemStart + ':00-' + curItemEnd + ':00';
                        selItem.push(arr[indexTemp]);
                        
                        arrTemp.forEach((item, index) => {
                            selItem[0].meetingData = selItem[0].meetingData.concat(item.meetingData);
                        })
                        selItem = selItem.concat(notCheckArr);
                        arr = selItem;
                    }
                }
            })
            dateItem.timeDate = arr;
        })
        return data;
    }
}


const exportMethods = {
    calenderSortData: privacyMethods.calenderSortData
};

export default exportMethods;