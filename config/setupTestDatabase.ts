import { Table } from "models/table";
import { Category } from "models/category";
import { Order } from "models/order";
import { Product } from "models/product";
import { Sequelize } from "sequelize-typescript";
import setupDatabase from "./setupDatabase";
import { OrderLine } from "models/order_line";
import { Feedback } from "models/feedback";

export default async (sequelize: Sequelize) => {
  await setupDatabase(sequelize, true)

  await Category.bulkCreate([
    {category: 'Drinks'},
    {category: 'Appetizers'},
    {category: 'Steaks'},
    {category: 'Pasta'}
  ])

  await Product.bulkCreate([
    {category_id: 1, name: 'Ice Chocolate', price: 3.20, image: 'https://natashaskitchen.com/wp-content/uploads/2020/11/Hot-Chocolate-Recipe-3-500x500.jpg'},
    {category_id: 1, name: 'Cold Water', price: 1.20, image: 'https://cdn.shopify.com/s/files/1/0014/3563/1652/articles/unnamed_1d924992-9e0d-4b09-a43d-22e377f4c076.jpg?v=1631553998'},
    {category_id: 1, name: 'Sprite', price: 2.00, image: 'https://adm.indline.com.sg//Dynamic/Products/150/Images/Sprite.jpg'},
    {category_id: 2, name: 'Coleslaw', price: 1.00, image: 'https://bellyfull.net/wp-content/uploads/2021/04/Coleslaw-KFC-blog-4.jpg'},
    {category_id: 2, name: 'Seaweed Fries', price: 2.00, image: 'https://www.897supperclub.com.sg/wp-content/uploads/2021/10/Seaweed-Fries.jpg'},
    {category_id: 3, name: 'Sirloin Steak', price: 16, image: 'https://www.charbroil.com/media/ctm//g/r/grilled_sirloin_steak.jpg.jpeg'},
    {category_id: 3, name: 'Ribeye Steak', price: 18, image: 'https://i0.wp.com/redmeatlover.com/wp-content/uploads/2018/12/IMG_6416.jpg?ssl=1'},
    {category_id: 4, name: 'Aglio Olio', price: 12, image: 'http://delishar.com/wp-content/uploads/2014/05/Thai-Style-Aglio-Olio-1.jpg'},
    {category_id: 4, name: 'Chicken Carbonara', price: 12, image: 'https://sparkpeo.hs.llnwd.net/e2/guid/Chicken-Carbonara/b6b0a16e-84b8-4cb7-b3f2-19e0ae6f99a0.jpg'}
  ])

  await Order.bulkCreate([
    {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
  ])

  await Table.bulkCreate([
    {table_no: 1, capacity: 4, current_order_id: 1},
    {table_no: 2, capacity: 2, current_order_id: 2},
    {table_no: 3, capacity: 2, current_order_id: 3},
    {table_no: 4, capacity: 4, current_order_id: 4},
    {table_no: 5, capacity: 4},
    {table_no: 6, capacity: 2},
    {table_no: 7, capacity: 8},
    {table_no: 8, capacity: 8},
  ])

  await OrderLine.bulkCreate([
    {order_id: 1, product_id: 1, status: 0},
    {order_id: 1, product_id: 2, status: 0},
    {order_id: 1, product_id: 2, status: 1},
    {order_id: 1, product_id: 4, status: 1},
    {order_id: 1, product_id: 7, status: 1},
    {order_id: 2, product_id: 2, status: 2},
    {order_id: 2, product_id: 8, status: 2},
    {order_id: 3, product_id: 1, status: 0},
    {order_id: 3, product_id: 9, status: 0},
    {order_id: 4, product_id: 7, status: 0},
    {order_id: 4, product_id: 9, status: 1},
    {order_id: 4, product_id: 6, status: 1},
    {order_id: 4, product_id: 6, status: 2},
    {order_id: 4, product_id: 3, status: 2},

    // For sales graph
    ...Array(10).fill({order_id: 5, product_id: 7, status: 2, createdAt: '2022-07-14 16:32:45.581 +00:00'}),
    ...Array(9).fill({order_id: 5, product_id: 7, status: 2, createdAt: '2022-06-14 16:32:45.581 +00:00'}),
    ...Array(11).fill({order_id: 5, product_id: 6, status: 2, createdAt: '2022-05-14 16:32:45.581 +00:00'}),
    ...Array(10).fill({order_id: 5, product_id: 6, status: 2, createdAt: '2022-04-14 16:32:45.581 +00:00'}),
    ...Array(8).fill({order_id: 5, product_id: 7, status: 2, createdAt: '2022-03-14 16:32:45.581 +00:00'}),
    ...Array(9).fill({order_id: 5, product_id: 7, status: 2, createdAt: '2022-02-14 16:32:45.581 +00:00'}),
    ...Array(10).fill({order_id: 5, product_id: 6, status: 2, createdAt: '2022-01-14 16:32:45.581 +00:00'}),
    ...Array(12).fill({order_id: 5, product_id: 6, status: 2, createdAt: '2021-12-14 16:32:45.581 +00:00'}),
    ...Array(13).fill({order_id: 5, product_id: 7, status: 2, createdAt: '2021-11-14 16:32:45.581 +00:00'}),
    ...Array(15).fill({order_id: 5, product_id: 7, status: 2, createdAt: '2021-10-14 16:32:45.581 +00:00'}),
    ...Array(13).fill({order_id: 5, product_id: 6, status: 2, createdAt: '2021-09-14 16:32:45.581 +00:00'}),
    ...Array(10).fill({order_id: 5, product_id: 6, status: 2, createdAt: '2021-08-14 16:32:45.581 +00:00'}),
  ])

  await Feedback.bulkCreate([
    {order_id: 5, rating: 5, content: 'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart.'},
    {order_id: 6, rating: 2, content: 'I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine.'},
    {order_id: 7, rating: 3, content: 'I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. '},
    {order_id: 8, rating: 1, content: 'I should be incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. '},
    {order_id: 9, rating: 4, content: ''},
    {order_id: 10, rating: 5, content: ''},
    {order_id: 11, rating: 2, content: 'When, while the lovely valley teems with vapour around me'},
    {order_id: 12, rating: 5, content: 'And the meridian sun strikes the upper surface of the impenetrable foliage of my trees'},
    {order_id: 13, rating: 1, content: 'I throw myself down among the tall grass by the trickling stream'},
    {order_id: 14, rating: 3, content: ''},
    {order_id: 15, rating: 3, content: ''},
    {order_id: 16, rating: 4, content: 'I lie close to the earth, a thousand unknown plants are noticed by me: when I hear the buzz of the little world among the stalks, and grow familiar with the countless indescribable forms of the insects and flies'},
    {order_id: 17, rating: 5, content: ''},
    {order_id: 18, rating: 5, content: ''},
  ])
}