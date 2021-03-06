var materialEdit = new Vue({
    el: 'body',
    data: {
        entity:{},
        materialEntity:{},
        materialList:[],
        selectIds:[],
        userList: {},
        pageNum:1,
        pageSize:10,
        itemCat1List:[],
        itemCat2List:[],
        itemCat3List:[],
    },
    created:function(){
        this.$http.post({
            url: "../category/queryCategoryByParentID.do?parentID=0"
        }).then(function (result) {
            this.itemCat1List = result.data;
        });

    },
    methods: {

        save:function(){
            this.materialEntity.goodsDesc.introduction=editor.html();/*将富文本编辑器的内容放入实体中*/
            this.$http.post({
                url:"../material/save.do",materialEntity
            })

        },
        updateSelection:function($event,id){
                // 复选框选中
                if($event.target.checked){
                    // 向数组中添加元素
                    this.selectIds.push(id);
                }else{
                    // 从数组中移除
                    var idx = this.selectIds.indexOf(id);
                    this.selectIds.splice(idx,1);
                }
        },
        loadMaterialList: function () {
            this.$http.post({
                url: "../material/queryByPage.do?pageNum="+this.pageNum+"&pageSize="+this.pageSize
            }).then(function (result) {
                this.userList = result.data;
            });
            /* for (var i = 0; i < this.userList.length; i++) {
                 if (this.userList[i].menuList.length == 0) {
                     this.userList[i].zclass = "collapse";
                 } else {
                     this.userList[i].zclass = "";
                 }

             }*/
        },
        uploadSectionFile: function (param) {
            var formData = new FormData();
            formData.append('id', this.ID);
            formData.append('file', this.file);
            $http({
                method: 'post',
                url: '../upload/uploadFile.do',
                data: formData,
                headers: {'Content-Type': undefined},// Content-Type : text/html  text/plain
                transformRequest: angular.identity

            });
        }
    },
    watch:{
        'materialEntity.material.category1Id':function () {
            this.$http.post({
                url: "../category/queryCategoryByParentID.do?parentID="+this.materialEntity.material.category1Id
            }).then(function (result) {
                this.itemCat2List = result.data;
            });
        },
        'materialEntity.material.category2Id':function () {
            this.$http.post({
                url: "../category/queryCategoryByParentID.do?parentID="+this.materialEntity.material.category2Id
            }).then(function (result) {
                this.itemCat3List = result.data;
            });
        },
        'materialEntity.material.category3Id':function () {
            this.$http.post({
                url: "../category/queryCategoryByID.do?ID="+this.materialEntity.material.category3Id
            }).then(function (result) {
                this.materialEntity.material.typeTemplateId=result.typeId;
            });
        }
    }
});