INSERT INTO `sd-frame-db`.`production_order_item` (`width`, `height`, `qty`, `production_order_id`, `is_custom_size`, `standard_frame_id`) 
VALUES (6, 8, 9, 21, 0, (SELECT id FROM standard_frame WHERE `name` = '6x8'));

INSERT INTO `sd-frame-db`.`production_order_item` (`width`, `height`, `qty`, `production_order_id`, `is_custom_size`, `standard_frame_id`) 
VALUES (4, 6, 7, 21, 0, (SELECT id FROM standard_frame WHERE `name` = '4x6'));

INSERT INTO `sd-frame-db`.`production_order_item` (`width`, `height`, `qty`, `production_order_id`, `is_custom_size`, `standard_frame_id`) 
VALUES (8.27, 11.69, 3, 21, 1, null);

INSERT INTO `sd-frame-db`.`production_order_item` (`width`, `height`, `qty`, `production_order_id`, `is_custom_size`, `standard_frame_id`) 
VALUES (8, 12, 2, 21, 0, (SELECT id FROM standard_frame WHERE `name` = '8x12'));

INSERT INTO `sd-frame-db`.`production_order_item` (`width`, `height`, `qty`, `production_order_id`, `is_custom_size`, `standard_frame_id`) 
VALUES (10, 12, 5, 21, 0, (SELECT id FROM standard_frame WHERE `name` = '10x12'));

INSERT INTO `sd-frame-db`.`production_order_item` (`width`, `height`, `qty`, `production_order_id`, `is_custom_size`, `standard_frame_id`) 
VALUES (8, 10, 10, 21, 0, (SELECT id FROM standard_frame WHERE `name` = '8x10'));

INSERT INTO `sd-frame-db`.`production_order_item` (`width`, `height`, `qty`, `production_order_id`, `is_custom_size`, `standard_frame_id`) 
VALUES (29, 10, 1, 21, 1, null);

INSERT INTO `sd-frame-db`.`production_order_item` (`width`, `height`, `qty`, `production_order_id`, `is_custom_size`, `standard_frame_id`) 
VALUES (20, 30, 2, 21, 1, null);

INSERT INTO `sd-frame-db`.`production_order_item` (`width`, `height`, `qty`, `production_order_id`, `is_custom_size`, `standard_frame_id`) 
VALUES (16, 20, 2, 21, 1, null);

INSERT INTO `sd-frame-db`.`production_order_item` (`width`, `height`, `qty`, `production_order_id`, `is_custom_size`, `standard_frame_id`) 
VALUES (10, 15, 3, 21, 0, (SELECT id FROM standard_frame WHERE `name` = '10x15'));