var app = angular.module("myApp", []);
        // app.config(function($routeProvider) {
        //     $routeProvider
        //     .when("/index",{
        //         templateUrl : "cart-page.html"
        //     })
        //     .when("/cart-page",{
        //         templateUrl : "index.html",
        //         controller : "myCtrl"
        //     })
        //     .when("/shop",{
        //         templateUrl : "shop.html",
        //         controller : "myCtrl"
        //     })
        // });
        app.controller('myCtrl', function($scope, $http) {
            //1, khai báo hàm đọc data từ file JSON
            function getData() {

                $http.get('assets/js/data.json')
                    .then(function (rspt) {
                    if (sessionStorage.getItem("sesCars") == null) {
                        //Ghi gia tri vao Session Storage
                        sessionStorage.setItem("sesCars", JSON.stringify(rspt.data));
                        //Doc data tu Session Storage do vao bien carList
                        $scope.cart = JSON.parse(sessionStorage.getItem("sesCars"));
                        $scope.total = JSON.parse(sessionStorage.getItem("sum"));
                    } else {
                        //Doc data tu Session Storage do vao bien carList
                        $scope.cart = JSON.parse(sessionStorage.getItem("sesCars"));
                        $scope.total = JSON.parse(sessionStorage.getItem("sum"));
                    }
                });
            }
            //2. Đọc data (Read)
            getData();
            //3. Khai báo biến môi trường
            $scope.carModel = {};
            $scope.carList = []; 
            $scope.cart = []; 
            $scope.value= parseInt(1);
           
            // $scope.Sum =function(value){
            //     return parseInt(value++);
            // };
           
            // }else(onclick(Delete(car))){
            //     total--;
            // };
            $scope.carModel.brand="Long-Hand T-shirt";
            $scope.carModel.price= 42;
            $scope.carModel.id='images/home/male-product-2.png';
            pushData($scope.carModel.id, $scope.carModel.brand, $scope.carModel.price);

            $scope.carModel.brand1="Beautiful T-shirt";
            $scope.carModel.price1= 27;
            $scope.carModel.id1='images/home/female-product-4.jpg';
            pushData($scope.carModel.id1, $scope.carModel.brand1, $scope.carModel.price1);

            $scope.carModel.brand2="Shorthand T-shirt";
            $scope.carModel.price2= 30;
            $scope.carModel.id2='images/home/male-product-1.png';
            pushData($scope.carModel.id2, $scope.carModel.brand2, $scope.carModel.price2);

            $scope.carModel.brand3="Spring Dress";
            $scope.carModel.price3= 120;
            $scope.carModel.id3='images/home/female-product-1.jpg';
            pushData($scope.carModel.id3, $scope.carModel.brand3, $scope.carModel.price3);

            $scope.carModel.brand4="Office Vest";
            $scope.carModel.price4= 135;
            $scope.carModel.id4='images/home/male-product-4.jpg';
            pushData($scope.carModel.id4, $scope.carModel.brand4, $scope.carModel.price4);

            $scope.carModel.brand5="Autumn Coat";
            $scope.carModel.price5= 85;
            $scope.carModel.id5='images/home/female-product-2.jpg';
            pushData($scope.carModel.id5, $scope.carModel.brand5, $scope.carModel.price5);

            $scope.carModel.brand6="Autumn Jacket 1";
            $scope.carModel.price6= 13;
            $scope.carModel.id6='images/home/male-product-3.png';
            pushData($scope.carModel.id6, $scope.carModel.brand6, $scope.carModel.price6);

            $scope.carModel.brand7="Style Vest";
            $scope.carModel.price7= 160;
            $scope.carModel.id7='images/home/female-product-3.jpg';
            pushData($scope.carModel.id7, $scope.carModel.brand7, $scope.carModel.price7);

            $scope.carModel.brand8="Autumn Jacket 2";
            $scope.carModel.price8= 13;
            $scope.carModel.id8='images/home/male-product-4.png';
            pushData($scope.carModel.id8, $scope.carModel.brand8, $scope.carModel.price8);

            $scope.carList.stt='';

            if (sessionStorage.getItem("listCar") == null){
                sessionStorage.setItem("listCar", JSON.stringify($scope.carList));
            }
            //4. Thêm data (Create)
            // if(onclick="Add" == true){
            //     $scope.carList.total += $scope.carModel.price;
            // }  
            // $scope.sum=$scope.dum;
            $scope.sum=00;
            // $scope.name='';
            // if($scope.carModel.brand == $scope.carModel.brand){
            //     $scope.gan=$scope.carModel.price;
            // }else if($scope.carModel.brand1 == $scope.carModel.brand1){
            //     $scope.gan=$scope.carModel.price1;
            // }
            function pushData (i_id, i_brand, i_price)
            {
                let car = {
                    id : i_id,
                    brand : i_brand,
                    price : i_price
                    };
                    $scope.carList.push(car);
            }
            
            $scope.Add = function (id) {
                sessionStorage.setItem("lock", 1);
                const cars = JSON.parse(sessionStorage.getItem("listCar"));
                $scope.cart = JSON.parse(sessionStorage.getItem("sesCars"));
                let total = JSON.parse(sessionStorage.getItem("sum"));
                let singlePrice = 0;
                if (total == null) total = 0;
                let car = {};

                for (let i = 0; i<$scope.cart.length; i++)
                {
                    if ($scope.cart[i].id == id)
                    {
                        singlePrice = $scope.cart[i].price / $scope.cart[i].qty;
                        $scope.cart[i].qty++;
                        $scope.cart[i].price = singlePrice * $scope.cart[i].qty;
                        total += singlePrice;   
                        alert("New Product is inserted into cart successfull");
                        sessionStorage.setItem("sum", total);
                        setStrorage();
                        sessionStorage.setItem("lock", 0);
                        return;
                    }
                }

                for (let i = 0; i<cars.length; i++)
                {
                    if (cars[i].id == id)
                    {
                        car = {
                            stt: $scope.cart.length +1,
                            id : cars[i].id,
                            brand : cars[i].brand,
                            qty : 1,
                            price : cars[i].price
                        };
                        $scope.cart.push(car);
                        break;
                    }
                }
 
                total += car.price;   
                alert("New Product is inserted into cart successfull");
                sessionStorage.setItem("sum", total);
                setStrorage();
            }

            
            //5. Sửa record (Update)
            $scope.Update = function () {
                var msg = "Are you sure to update this record?";
                $.grep($scope.carList, function (e) {
                    if (e.id == $scope.carModel.id) {
                        if(confirm(msg)){
                            e.model = $scope.carModel.model;
                            e.brand = $scope.carModel.brand;
                            e.price = $scope.carModel.price;
                            setStrorage();
                            $scope.btnUpdate = true;
                            $scope.btnSave = false;
                        }
                    }
                });
                SetDefault();
            }
            //6. Xóa record (Delete)
            $scope.Delete = function (car, event) {
                var msg = "Are you sure to delete this record?";
                if(confirm(msg)){
                    $scope.total = JSON.parse(sessionStorage.getItem("sum"));
                    if (car == null || car == "null")
                    {
                        const id = $(event.target).parents('li').find(".cart-item-image").attr("src");
                        for (let i = 0; i < $scope.cart.length; i++)
                        {
                            if ($scope.cart[i].id == id)
                            {
                                $scope.total -= $scope.cart[i].price;
                                $scope.cart.splice(i,1);
                                break;
                            }
                        }
                    }
                    else
                    {
                        var index = $scope.cart.indexOf(car);
                        $scope.cart.splice(index,1);
                        $scope.total -= car.price;
                    }
                    sessionStorage.setItem("sum", $scope.total);
                    setStrorage();
                }
            }
            
            //7. Nâng cao
            //7.1. Reset
            $scope.SetDefault =function() {
                $scope.carModel.id = '';
                $scope.carModel.brand = '';
                $scope.carModel.price = '';

            }
            //7.2. Tìm kiếm
            $scope.sort = {};   //Sort
            $scope.doSort = function(cot){
                var sort = $scope.sort;
                if(sort.cot == cot){
                    sort.descending = !sort.descending;
                }
                else{
                    sort.cot = cot;
                    sort.descending = false;
                }
            };
            //7.3. Ghi vào SessionStorage
            function setStrorage () {
                var data = JSON.stringify ($scope.cart);
                sessionStorage.setItem("sesCars", data);
            }
            //7.4 Bắt lỗi
            if($scope.carModel.model<=100){
                $scope.carModel.model='';
            }
            // 7.5 Total product
            // $scope.total= 0;
            // if(onclick="Add()"){
            //     $scope.total=total++;
            // };
            $scope.GetTotalQty = function() {
                const cart = JSON.parse(sessionStorage.getItem("sesCars"));
                let totalQty = 0;
                cart.forEach(function(car) {
                    totalQty += car.qty;
                });
                return totalQty;
            }
        });