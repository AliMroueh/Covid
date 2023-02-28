import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Axios from 'axios'
import passport from 'passport';


const covidRouter = express.Router();

covidRouter.get('/',
passport.authenticate('jwt', { session: false }),
 expressAsyncHandler(async(req,res) => {
    try {
        // https://covid-19-statistics.p.rapidapi.com/regions
        // https://data.ct.gov/resource/rf3k-f8fg.json
        const {data} = await Axios.get('https://data.ct.gov/resource/rf3k-f8fg.json');
        res.send(data)
    } catch (error) {
        res.status('401').send(error)
    }

    // console.log(data)
    // res.send({message: 'hello'})
}))

export default covidRouter;