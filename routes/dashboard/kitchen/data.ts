var flash = require('prompt-sync')();
var express = require('express');
var sqlite = require('sqlite');

function FoodItems() {
    var foodname = $('#addingfood').data("foodname");
    var foodprice = $('#addingfood').data("foodprice");
    var foodpicture = $('#addingfood').data("foodpicture");
    var foodnameStr= "foodname=" + foodname;
    var foodpriceInt = "foodprice=" + foodprice;
    var foodpictureStr = "foodpicture" + foodpicture;

    $.ajax({
        url: 'views/kitchen/dashboard/product.hanldebars',
        dataType: 'text',
        data: foodnameStr,
        success: function(data) {
           callBack(data);
        }
    });
}

function callBack(data) {
    
}

function storeFoodItems() {
    var foodname = $('#name').val();
    $('addingfood').data("foodname", foodname);
    var foodprice = $('#foodprice').val();
    $('addingfood').data("foodprice", foodprice);
    var foodpicture = $('#foodpicture').val();
    $('#addingfood').data("foodprice", foodprice);
}

$(document).ready( function() {
    $('#AddButton').click( function() {
        storeFoodItems();
    });
});

