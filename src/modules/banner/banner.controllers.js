import messages from '../../utils/messages';
import HTTPStatus from 'http-status';
import Banner from '../banner/banner.model';
import { ROLES } from "../../utils/enum";

export async function bannerList(req, res) {
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    }
    try {
        const banner = await Banner.find(req.filterQuery, req.selectQuery, req.limitQuery).sort(req.sortQuery);
        if (!banner) {
            response.status = messages.FAILED;
            return res.status(200).json(response)

            // return sendResponse(null, HTTPStatus.OK, response, res, req);
        }
        response.data = banner;
        response.status = messages.SUCCESS;
        return res.status(200).json(response)
        // return sendResponse("banner", HTTPStatus.OK, response, res, req);
    }
    catch (e) {
        response.status = messages.ERROR;
        return res.status(200).json(response)
       //  return sendResponse(e.message, HTTPStatus.OK, response, res, req);
    }
}

export async function deleteBanner(req, res) {
    const response = {
        success: messages.FAILED,
        data: null,
        message: null
    };

    try {
        await Banner.findByIdAndDelete(req.params.id, (err, doc) => {

            if (err) {
                response.success = messages.ERROR;
                return "";
                // return sendResponse(err.message, HTTPStatus.OK, response, res, req);
            }
            response.data = doc;
            response.success = messages.SUCCESS;
            return "";
            // return sendResponse("Устгагдлаа", HTTPStatus.OK, response, res, req);
        });
    }
    catch (error) {
        response.success = messages.ERROR;
        return "";
        // return sendResponse(error.message, HTTPStatus.OK, response, res, req);
    }
};