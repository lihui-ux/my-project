//  引入mockjs
import mock from "mockjs";
//  引入模拟的数据
import banner from "./banner.json"
import floor from "@/mock/floor"
// 第二个mock是上面的一个方法，第一个参数是数据的路径，第二个参数是返回的数据
mock.mock("/mock/banner",{code:200,data:banner})
mock.mock("/mock/floor",{code:200,data:floor})