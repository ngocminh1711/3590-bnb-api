import HouseForRent from "../models/product.schema/housesForRent.schema.js";
import houseStatus from "../models/product.schema/houseStatusSchema.js";
import TypeRoom from "../models/product.schema/typeRooms.schema.js";
import User from '../models/userSchesma/user.js'
import UserGoogle from "../models/userSchesma/userGoogle.js";


class ProductController {
    async createHouseForRent(req, res) {
        try {
            const data = {
                name: req.body.name,
                address: req.body.address,
                numberOfBedrooms: req.body.numberOfBedrooms,
                numberOfBathrooms: req.body.numberOfBathrooms,
                roomRates: req.body.roomRates,
                description: req.body.description,
                image_backdrop: req.body.image_backdrop,
                image_view: req.body.image_view,
                TypeRoom: req.body.typeRoom,
                numberOfTenants: req.body.numberOfTenants,
                Status: req.body.status,
                userId: req.body.userId,
            };

            let houseForRent = new HouseForRent({
                name: data.name,
                address: data.address,
                numberOfBedrooms: data.numberOfBedrooms,
                numberOfBathrooms: data.numberOfBathrooms,
                roomRates: data.roomRates,
                description: data.description,
                image_backdrop: data.image_backdrop,
                image_view: data.image_view,
                typeRoom: data.TypeRoom,
                numberOfTenants: data.numberOfTenants,
                status: data.Status,
                userId: data.userId,
            });
            await houseForRent.save();

            return res.status(200).json({
                status: "success",
                message: "House For Rent create successfully",
            });
        } catch (err) {
            return res.json({
                status: "error",
                message: "Create error",
            });
        }
    }

    async deleteHouseForRent(req, res) {
        try {
            await HouseForRent.findByIdAndRemove(req.params.id);
            res.status(200).json("delete success!");
        } catch (err) {
            err.message;
        }
    }

    async getHouseForRentById(req, res) {
        try {
            let id = req.params.id;

            let houseForRent = await HouseForRent.findOne({_id: id})
                .populate("typeRoom")
                .populate("status");

            return res.status(200).json({
                status: "success",
                message: "Get house for rent successfully",
                data: houseForRent,
            });
        } catch (err) {
            res.json({
                status: "error",
                message: "Get House for rent error",
            });
        }
    }

    async getHouseForRent(req, res) {
        try {
            let houseForRents = await HouseForRent.find()
                .populate("typeRoom")
                .populate("status");
            return res.status(200).send({
                status: "success",
                message: "Get house for rent successfully",
                houseForRents: houseForRents,
            });
        } catch (err) {
            return res.json({
                status: "error",
                message: "Error getting House for rent",
            });
        }
    }

    async getTypeRoom(req, res) {
        try {
            const type = await TypeRoom.find();
            return res.status(200).json({
                status: "success",
                message: "Get type room successfully",
                data: type,
            });
        } catch (err) {
            return res.json({
                status: "error",
                message: "Get TypeRoom error",
            });
        }
    }

    async getHouseStatus(req, res) {
        try {
            const type = await houseStatus.find();
            return res.status(200).json({
                status: "success",
                message: "Get status successfully",
                data: type,
            });
        } catch (err) {
            return res.json({
                status: "error",
                message: "Get status error",
            });
        }
    }

    async searchHouseForRent(req, res) {
        try {
            let keyword = req.params.keyword;
            let typeRooms = await TypeRoom.find({
                $or: [{name: {$regex: `${keyword}`, $options: "i"}}],
            });
            let houseForRent = await HouseForRent.find({
                $or: [
                    {address: {$regex: `${keyword}`, $options: "i"}},
                    {name: {$regex: `${keyword}`, $options: "i"}},
                    {typeRoom: typeRooms},
                ],
            }).populate("typeRoom");
            if (!houseForRent) {
                return res.status(404).send({
                    status: "error",
                    message: "House for rent not found",
                });
            } else {
                return res.status(200).send({
                    status: "success",
                    message: "Search house for rent successfully",
                    houseForRent: houseForRent,
                });
            }
        } catch (err) {
            return res.status(404).send({
                status: "error",
                message: "House for rent not found",
            });
        }
    }

    async getTopHouseForRent(req, res) {
        try {
            const topHouseForRent = await HouseForRent.find().limit(4);
            if (topHouseForRent) {
                return res.status(200).send({
                    status: "success",
                    message: "Get top house for rent successfully",
                    topHouseForRent: topHouseForRent,
                });
            } else {
                return res
                    .status(404)
                    .json({status: "top house not found", message: "Get top error"});
            }
        } catch (err) {
            res.status(404).json({
                status: "error",
                message: "Not found top house for rent",
            });
            console.log(err.message);
        }
    }

    async getVipHouse(req, res) {
        try {
            let typeRoomVip = await TypeRoom.findOne({name: "VIP"});

            let vipHouse = await HouseForRent.find({
                typeRoom: typeRoomVip,
            }).populate("typeRoom");
            if (vipHouse) {
                return res.status(200).send({
                    status: "success",
                    message: "get Vip House successfully",
                    vipHouse: vipHouse,
                });
            } else {
                return res
                    .status(404)
                    .json({status: "not found", message: "Get Vip House error"});
            }
        } catch (err) {
            res.status(404).json({status: "error", message: "not found"});
        }
    }

    async getNormalHouse(req, res) {
        try {
            let typeRoomNormal = await TypeRoom.find({
                name: {$in: ["Single Room", "Double Room", "President Room"]},
            });

            let normalHouse = await HouseForRent.find({
                typeRoom: typeRoomNormal,
            }).populate("typeRoom");

            if (normalHouse) {
                return res.status(200).send({
                    status: "success",
                    message: "get Normal House successfully",
                    normalHouse: normalHouse,
                });
            } else {
                return res
                    .status(404)
                    .json({status: "not found", message: "Get Normal House error"});
            }
        } catch (err) {
            res.status(404).json({status: "error", message: "not found"});
        }
    }

    async getOneBedRoom(req, res) {
        try {
            let oneBedRoom = await HouseForRent.find({numberOfBedrooms: 1});
            if (oneBedRoom) {
                return res.status(200).send({
                    status: "success",
                    message: "get One Bed Room successfully",
                    oneBedRoom: oneBedRoom,
                });
            } else {
                return res
                    .status(404)
                    .json({status: "not found", message: "Get One bed room error"});
            }
        } catch (err) {
            res.status(404).json({status: "error", message: "not found bed room "});
        }
    }

    async getMultipleBedRoom(req, res) {
        try {
            let multipleBedRoom = await HouseForRent.find({
                numberOfBedrooms: {$in: [2, 3, 4, 5, 6, 7, 8, 9, 10]},
            });
            if (multipleBedRoom) {
                return res.status(200).send({
                    status: "success",
                    message: "get Multiple Bed Room successfully",
                    multipleBedRoom: multipleBedRoom,
                });
            } else {
                return res.status(404).json({
                    status: "not found",
                    message: "Get Multiple bed room error",
                });
            }
        } catch (err) {
            res.status(404).json({status: "error", message: "not found bed room "});
        }
    }

    async userHouse(req, res) {
        try {
            let id = req.params.id;
            let userHouse = await HouseForRent.find({userId: id})
                .populate("typeRoom")
                .populate("status");
            return res.status(200).send({
                status: "success",
                message: "Get user's house successfully",
                houseForRents: userHouse,
            });
        } catch (err) {
            return res.json({
                status: "error",
                message: "Error getting user's House",
            });
        }
    }

  async getOneBathRoom(req, res) {
    try {
      let oneBathRoom = await HouseForRent.find({numberOfBathrooms: 1})
      if (oneBathRoom) {
        return res.status(200).send({
          status: 'success',
          message: 'get One Bath Room successfully',
          oneBathRoom: oneBathRoom
        })
      } else {
        return res.status(404).json({status: 'not found', message: 'Get One bath room error'})
      }
    } catch (err) {
      res.status(404).json({status: 'error', message: 'not found bath room '})
    }
  }

  async getMultipleBathRoom(req, res) {
    try {
      let multipleBathRoom = await HouseForRent.find({numberOfBathrooms: {$in: [2, 3]}})
      if (multipleBathRoom) {
        return res.status(200).send({
          status: 'success',
          message: 'get Multiple Bath Room successfully',
          multipleBathRoom: multipleBathRoom
        })
      } else {
        return res.status(404).json({status: 'not found', message: 'Get Multiple bath room error'})
      }
    } catch (err) {
      res.status(404).json({status: 'error', message: 'not found bath room '})
    }
  }

  async getRoomRatesLess500(req, res) {
    try {
      let roomRates = await HouseForRent.find({roomRates: {$lt: 500}})
      if (roomRates) {
        return res.status(200).send({
          status: 'success',
          message: 'get room rates less 500 successfully',
          roomRates: roomRates
        })
      } else {
        return res.status(404).json({
          status: 'error',
          message: 'get room rates less 500 error',
        })
      }
    } catch (err) {
      res.status(404).json({status: 'error', message: err.message})
    }
  }
  async getRoomRatesThan500(req, res) {
    try {
      let roomRates = await HouseForRent.find({roomRates:{$gte:500 ,$lte:1000}})
      if(roomRates){
        return res.status(200).send({
          status: 'success',
          message: 'get room rates than 500 successfully',
          roomRates: roomRates
        })
      } else {
        return res.status(404).json({
          status: 'error',
          message: 'get room rates than 500 error',
        })
      }
    } catch (err) {
      res.status(404).json({status: 'error', message: err.message})
    }
  }
  async getRoomRatesThan1000(req, res) {
    try {
      let roomRates = await HouseForRent.find({roomRates:{$gte:1000}})
      if(roomRates){
        return res.status(200).send({
          status: 'success',
          message: 'get room rates than 1000 successfully',
          roomRates: roomRates
        })
      } else {
        return res.status(404).json({
          status: 'error',
          message: 'get room rates than 1000 error',
        })
      }
    } catch (err) {
      res.status(404).json({status: 'error', message: err.message})
    }
  }

    async updateHouse(req, res) {
        try {
            let data = req.body;
            let id = req.params.id;


            await HouseForRent.findByIdAndUpdate(id, data)

            return res.status(200).json({status: "success", message: "Update successfully"})
        } catch (err) {
            return res.status(404).json({status: "error", message: "Update error"})
        }
    }

    async getHost(req, res) {
        try {
            let id = req.params.id;
            let houseById = await HouseForRent.findById(id)
            let user = await UserGoogle.findOne({_id: houseById.userId}) || await User.findOne({_id: houseById.userId});
            return res.status(200).json({status: "success", message: 'successfully', host: user})
        }
        catch (err) {
            res.status(404).json({status: "error", message: err.message})
        }


    }

}

export default ProductController;