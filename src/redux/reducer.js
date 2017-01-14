/**
 * Created by Administrator on 2016/10/19.
 */
export  default function reducer(state = 0, action) {
    console.log(state,action)
    switch (action.type) {
        case "@@redux/INIT":
            return state;
        case "onMouseOn":
            var newob = Object.assign({},state);
            newob.newValue = action.detailDesc;
            return newob;
        default:
            return state;
    }
}