export async function checkListQuery(req, res, next) {
    var pageNo = parseInt(req.query.pageNo);
    var size = parseInt(req.query.size);
    var limitQuery = {};
    if(pageNo < 0 || pageNo === 0) {
            return sendResponse("Хуудсын дугаар 0 байх боломжгүй" , HTTPStatus.OK , response , res , req);
    }
    limitQuery.skip = size * (pageNo - 1);
    limitQuery.limit = size;

    req.limitQuery = limitQuery;
    if(req.query.filtered !== null){
       req.filterQuery = req.query.filtered;
    }
    if(req.query.sorted !== null){
      req.sortQuery = req.query.sorted;
    }
    if(req.query.selected !== null){
      req.selectQuery = req.query.selected;
    }
    return next();
}