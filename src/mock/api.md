
 <h1 class="curproject-name"> 2020_source_design </h1> 
 2020 软件项目管理课程设计


# 公共分类

## 修改密码
<a id=修改密码> </a>
### 基本信息

**Path：** /user/changePassword

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/x-www-form-urlencoded | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| id | 是  |  0 |  用户id |
| account | 是  |  'fuck' |  账号 |
| oldAccount | 是  |  'fuckyou" |  旧密码（明文，没时间加密了 |
| newAccount | 是  |  'motherfucker' |  新密码（明文，没时间加密了 |
**Body**

| 参数名称  | 参数类型  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| id | text  |  是 |  0  |  用户id |
| account | text  |  是 |  'fuck'  |  账号 |
| oldPassword | text  |  是 |  'fuckyou'  |  旧密码（没时间加密了 |
| newPassword | text  |  是 |  'motherfucker'  |  新密码（没时间加密了 |



### 返回数据

```javascript
{
   "status_code": 1000,
   "data|regexp": "SUCCESS|FAILED"
}
```
## 根据 id 报废某个物品
<a id=根据 id 报废某个物品> </a>
### 基本信息

**Path：** /project/destoryProjectById

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| id | 是  |  0 |  物品的 id |

### 返回数据

```javascript
{
   "status_code": 1000,
   "data": {}
}
```
## 根据物品 id 修复物品
<a id=根据物品 id 修复物品> </a>
### 基本信息

**Path：** /project/repairProjectById

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| id | 是  |  0 |  物品的 id |

### 返回数据

```javascript
{
   "status_code": 1000,
   "data": {}
}
```
## 添加物品
<a id=添加物品> </a>
### 基本信息

**Path：** /project/addProject

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| projectName | 是  |  'fuck' |  添加物品的名称 |

### 返回数据

```javascript
{
   "status_code": 1000,
   "data": {}
}
```
## 登出
<a id=登出> </a>
### 基本信息

**Path：** /auth/logout

**Method：** GET

**接口描述：**


### 请求参数

### 返回数据

```javascript
{
   "status_code": 1000
}
```
## 登录
<a id=登录> </a>
### 基本信息

**Path：** /auth/login

**Method：** POST

**接口描述：**


### 请求参数
**Headers**

| 参数名称  | 参数值  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| Content-Type  |  application/x-www-form-urlencoded | 是  |   |   |
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| account | 是  |  'fuckyou' |  账号 |
| password | 是  |  '123' |  密码 |
**Body**

| 参数名称  | 参数类型  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ | ------------ |
| account | text  |  是 |  'fuckyou'  |  账号 |
| password | text  |  是 |  '123'  |  密码（明文 |



### 返回数据

```javascript
{
   "status_code|1000": 1000,
   "data": {
      "userName|regexp": "[a-zA-Z0-9]{6}",
      "account|regexp": "[a-zA-Z0-9]{6}",
      "id": "@integer"
   }
}
```
## 获取修理记录
<a id=获取修理记录> </a>
### 基本信息

**Path：** /project/getRepairList

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| limit | 是  |  10 |   |
| offset | 是  |  0 |   |

### 返回数据

```javascript
{
  "status_code": 1000,
  "data": {
    "rows|0-10": [
      {
        "id|regexp": "[a-zA-Z0-9]{6}",
        "name|regexp": "[a-z_A-Z 0-9]{5,20}",
        "reason|regexp": "[a-z_A-Z0-9]{10,30}",
        "createTime": "@datetime",
        "updateTime": "@datetime",
      }
    ],
    "count|9-100": 0
  }
}

```
## 获取审批列表（需要后端获取 session user id，只寻找需要这个人审批的清单
<a id=获取审批列表（需要后端获取 session user id，只寻找需要这个人审批的清单> </a>
### 基本信息

**Path：** /project/getAuthList

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| limit | 是  |  10 |   |
| offset | 是  |  0 |   |

### 返回数据

```javascript
{
   "status_code": 1000,
   "data": {
      "rows|0-10": [
         {
            "id": "@integer",
            "creator|regexp": "[a-zA-Z0-9]{6}",
            "auther|regexp": "[a-zA-Z0-9]{6}",
            "status|0-2": 0,
            "projectName|regexp": "[a-z_A-Z 0-9]{5,20}",
            "rejectReason|regexp": "[a-z_A-Z 0-9]{10,30}",
            "buyReason|regexp": "[a-z_A-Z 0-9]{10,30}",
            "updateTime": "@datetime"
         }
      ],
      "count|9-100": 0
   }
}
```
## 获取报废列表
<a id=获取报废列表> </a>
### 基本信息

**Path：** /project/getDestoryList

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| limit | 是  |  10 |   |
| offset | 是  |  0 |   |

### 返回数据

```javascript
{
   "status_code": 1000,
   "data": {
      "rows|0-10": [
         {
            "projectId|regexp": "[a-zA-Z0-9]{6}",
            "name|regexp": "[a-z_A-Z 0-9]{5,20}",
            "reason|regexp": "[a-z_A-Z 0-9]{10,30}",
            "createTime": "@datetime"
         }
      ],
      "count|9-100": 0
   }
}
```
## 获取物品列表
<a id=获取物品列表> </a>
### 基本信息

**Path：** /project/getProjectList

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| limit | 是  |  10 |  页面容量限制（分页用 |
| offset | 是  |  0 |  第 x 页（分页用 |
| searchName | 是  |  "Hello" |  根据 searchName 模糊搜索项目名称 |

### 返回数据

```javascript
{
   "status_code": 1000,
   "data": {
      "rows|0-10": [
         {
            "id|regexp": "[a-zA-Z0-9]{6}",
            "name|regexp": "[a-z_A-Z 0-9]{5,20}",
            "status|0-2": 0,
            "createTime": "@datetime",
            "updateTime": "@datetime"
         }
      ],
      "count|9-100": 0
   }
}
```
## 获取购买记录
<a id=获取购买记录> </a>
### 基本信息

**Path：** /project/getBuyList

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| limit | 是  |  10 |   |
| offset | 是  |  0 |   |

### 返回数据

```javascript
{
   "status_code": 1000,
   "data": {
      "rows|0-10": [
         {
            "creator|regexp": "[a-zA-Z0-9]{6}",
            "auther|regexp": "[a-zA-Z0-9]{6}",
            "status|0-2": 0,
            "projectName|regexp": "[a-z_A-Z 0-9]{5,20}",
            "rejectReason|regexp": "[a-z_A-Z 0-9]{10,30}",
            "buyReason|regexp": "[a-z_A-Z 0-9]{10,30}",
            "updateTime": "@datetime"
         }
      ],
      "count|9-100": 0
   }
}
```
## 通过/拒绝某个审核
<a id=通过/拒绝某个审核> </a>
### 基本信息

**Path：** /project/promiseSomeAuthRequest

**Method：** GET

**接口描述：**


### 请求参数
**Query**

| 参数名称  |  是否必须 | 示例  | 备注  |
| ------------ | ------------ | ------------ | ------------ |
| id | 是  |  0 |  审核的 id |
| reason | 是  |  true |  true 是通过，false 是审核不通过 |

### 返回数据

```javascript
{
   "status_code": 1000,
   "data": {}
}
```
## 鉴权
<a id=鉴权> </a>
### 基本信息

**Path：** /auth/checkLogin

**Method：** GET

**接口描述：**


### 请求参数

### 返回数据

```javascript
{
   "status_code|1000-1001": 1000,
   "data": {
      "userName|regexp": "[a-zA-Z0-9]{6}",
      "account|regexp": "[a-zA-Z0-9]{6}",
      "id": "@integer"
   }
}
```