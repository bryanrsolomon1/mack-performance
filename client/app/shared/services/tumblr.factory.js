/**
 * Created by bryansolomon on 5/23/17.
 */
(function () {
    'use strict';

    function Tumblr($http, $cacheFactory, $q, API_SERVER, USE_TEST_DATA) {

        var blogsCache = $cacheFactory("blog");

        var testRecentPostsData = {
            "meta": {"status": 200, "msg": "OK"},
            "response": {
                "blog": {
                    "ask": true,
                    "ask_anon": false,
                    "ask_page_title": "Ask me anything",
                    "can_subscribe": false,
                    "description": "",
                    "is_adult": false,
                    "is_nsfw": false,
                    "likes": 0,
                    "name": "mackperformance",
                    "posts": 2,
                    "reply_conditions": "3",
                    "share_likes": true,
                    "subscribed": false,
                    "title": "Get fit; Stay fit",
                    "total_posts": 2,
                    "updated": 1495727769,
                    "url": "https://mackperformance.tumblr.com/"
                },
                "posts": [{
                    "type": "text",
                    "blog_name": "mackperformance",
                    "id": 161060679604,
                    "post_url": "https://mackperformance.tumblr.com/post/161060679604/hand-size-portion-guide",
                    "slug": "hand-size-portion-guide",
                    "date": "2017-05-25 15:56:08 GMT",
                    "timestamp": 1495727768,
                    "state": "published",
                    "format": "html",
                    "reblog_key": "XDF8BtJU",
                    "tags": [],
                    "short_url": "https://tmblr.co/Z6nWrd2L-zk_q",
                    "summary": "Hand Size Portion Guide",
                    "recommended_source": null,
                    "recommended_color": null,
                    "note_count": 0,
                    "title": "Hand Size Portion Guide",
                    "body": "<p>By Mackennon Klink, B.S., CSCS, PN1<br/></p><p> </p><p>The goal of the Hand Size Portion Guide is to help you reach your nutrition and fitness goals without the tedious and somewhat difficult process of calorie counting.  This is a super simple and easy method to help keep calories in control and learn portion sizes.  The best part?  All you need is your hand.</p><p><br/></p><p>The hand size methods works for a few reasons:</p><p>1.     Hands are portable.  Unlike food scales, your hands will always be with you at home, work, restaurants, social gatherings, etc.</p><p>2.     Hands are scaled to the individuals.  Generally speaking, bigger people need more food and tend to have bigger hands, therefore getting larger portion.  Smaller people need less food, tend to have smaller hands and therefore getting smaller portions.</p><p>3.     By using your hands as a guide, it will provide reasonable amounts of nutrition dense foods and their specific macronutrients (protein, carbohydrates, and fats) and calorie needs without having to weigh your food or using an app, like MyFitnessPal.  </p><p>In short, this guide will help you create a nutritional foundation or baseline without making it overly complicated.  Most people will start getting positive results by simply sticking to these simple recommendations.  As you progress, we can make the necessary adjustments to make your process faster or overcome any plateau that might occur.   </p><p><i><b>Total Daily Intake</b></i></p><p><b><br/></b></p><p><b>For the entire day, Men should aim for: </b></p><ul><li><b>    Protein - 6-8 palms<br/></b></li><li><b>    Vegetables - 6-8 fists<br/></b></li><li><b>    Carb - 6-8 cupped handfuls<br/></b></li><li><b>    Fat - 6-8 thumbs<br/></b></li></ul><p><b><br/></b></p><p><b> For the entire day, Women should aim for: </b></p><ul><li><b>    Protein - 4-6 palms<br/></b></li><li><b>    Vegetables - 4-6 fists<br/></b></li><li><b>    Carbs - 4-6 cupped handfuls<br/></b></li><li><b>    Fat - 4-6 thumbs</b><br/></li></ul><p><br/></p><p>Here’s another way to view your nutrition intake <i>for each meal</i>.</p><p><b>Men</b></p><ul><li><b>Protein - 2 palms<br/></b></li><li><b>Vegetables - 2 fists<br/></b></li><li><b>Carbs - 2 cupped handfuls<br/></b></li><li><b>Fats - 2 thumbs</b></li></ul><p><b> Women</b></p><ul><li><b>Protein - 1 palm<br/></b></li><li><b>Vegetables - 1 fist<br/></b></li><li><b>Carbs - 1 cupped handful<br/></b></li><li><b>Fats - 1 thumb<br/></b></li></ul><p><br/></p><p>This will be your starting point.  This will allow you to get in the adequate food and calories to meet your goals. Remember, hands are scaled to you; a smaller person will need less food than a larger person.  Again, don’t worry about counting calories; we are focusing on developing healthy eating habits and controlling overall calorie intake.  You have to build a foundation before you begin building the house.  </p><p><b>Visual Guides</b></p><p><br/></p><p>The picture below is your visual guide to determining your portion size.  Rather simply right?</p><figure data-orig-width=\"1069\" data-orig-height=\"1051\" class=\"tmblr-full\"><img src=\"http://68.media.tumblr.com/e894efb55bb474284f42d4c44bca6b6c/tumblr_inline_oqin4mKBE21um4rwc_540.png\" alt=\"image\" data-orig-width=\"1069\" data-orig-height=\"1051\"/></figure><p>Copyright: Precision Nutrition</p><p><br/></p><p><br/></p><p>Here is another visual rep to help see how an anytime (breakfast, lunch, dinner) plate should consist of:</p><figure data-orig-width=\"900\" data-orig-height=\"1150\" class=\"tmblr-full\"><img src=\"http://68.media.tumblr.com/1ad838ff1fa0671bcf9af1726a270e06/tumblr_inline_oqin8w4AVo1um4rwc_540.png\" alt=\"image\" data-orig-width=\"900\" data-orig-height=\"1150\"/></figure><p>Copyright: Precision Nutrition</p><p>This second plate shows what a “post-workout” plate should consist of. Eat a post workout meal within 1 hour after your weight training or intense exercise session. By doing so, you will maximize your gains   This plate differs from the previous plate by taking advantage of the body’s metabolic response to exercise. After exercise, your body needs both carbs and protein to help rebuild your muscles and restore overall energy levels.</p><figure data-orig-width=\"900\" data-orig-height=\"1137\" class=\"tmblr-full\"><img src=\"http://68.media.tumblr.com/0d008d3bdb1d348e7397ca409c4badd5/tumblr_inline_oqin9stxxJ1um4rwc_540.png\" alt=\"image\" data-orig-width=\"900\" data-orig-height=\"1137\"/></figure><p>Copyright: Precision Nutrition</p><p><br/></p><p>At first, it may be a bit difficult to assess portion sizes, but practice makes perfect.  After a few meals, this method will become familiar and in no time this will be a breeze. Take it one meal and one day at a time; Rome wasn’t built overnight and neither will your body.<br/></p><p><br/></p><p><br/></p><p><br/></p><p>Copyright: Precision Nutrition</p>",
                    "reblog": {
                        "comment": "<p>By Mackennon Klink, B.S., CSCS, PN1<br></p><p> </p><p>The goal of the Hand Size Portion Guide is to help you reach your nutrition and fitness goals without the tedious and somewhat difficult process of calorie counting.  This is a super simple and easy method to help keep calories in control and learn portion sizes.  The best part?  All you need is your hand.</p><p><br></p><p>The hand size methods works for a few reasons:</p><p>1.     Hands are portable.  Unlike food scales, your hands will always be with you at home, work, restaurants, social gatherings, etc.</p><p>2.     Hands are scaled to the individuals.  Generally speaking, bigger people need more food and tend to have bigger hands, therefore getting larger portion.  Smaller people need less food, tend to have smaller hands and therefore getting smaller portions.</p><p>3.     By using your hands as a guide, it will provide reasonable amounts of nutrition dense foods and their specific macronutrients (protein, carbohydrates, and fats) and calorie needs without having to weigh your food or using an app, like MyFitnessPal.  </p><p>In short, this guide will help you create a nutritional foundation or baseline without making it overly complicated.  Most people will start getting positive results by simply sticking to these simple recommendations.  As you progress, we can make the necessary adjustments to make your process faster or overcome any plateau that might occur.   </p><p><i><b>Total Daily Intake</b></i></p><p><b><br></b></p><p><b>For the entire day, Men should aim for: </b></p><ul><li><b>    Protein - 6-8 palms<br></b></li><li><b>    Vegetables - 6-8 fists<br></b></li><li><b>    Carb - 6-8 cupped handfuls<br></b></li><li><b>    Fat - 6-8 thumbs<br></b></li></ul><p><b><br></b></p><p><b> For the entire day, Women should aim for: </b></p><ul><li><b>    Protein - 4-6 palms<br></b></li><li><b>    Vegetables - 4-6 fists<br></b></li><li><b>    Carbs - 4-6 cupped handfuls<br></b></li><li><b>    Fat - 4-6 thumbs</b><br></li></ul><p><br></p><p>Here’s another way to view your nutrition intake <i>for each meal</i>.</p><p><b>Men</b></p><ul><li><b>Protein - 2 palms<br></b></li><li><b>Vegetables - 2 fists<br></b></li><li><b>Carbs - 2 cupped handfuls<br></b></li><li><b>Fats - 2 thumbs</b></li></ul><p><b> Women</b></p><ul><li><b>Protein - 1 palm<br></b></li><li><b>Vegetables - 1 fist<br></b></li><li><b>Carbs - 1 cupped handful<br></b></li><li><b>Fats - 1 thumb<br></b></li></ul><p><br></p><p>This will be your starting point.  This will allow you to get in the adequate food and calories to meet your goals. Remember, hands are scaled to you; a smaller person will need less food than a larger person.  Again, don’t worry about counting calories; we are focusing on developing healthy eating habits and controlling overall calorie intake.  You have to build a foundation before you begin building the house.  </p><p><b>Visual Guides</b></p><p><br></p><p>The picture below is your visual guide to determining your portion size.  Rather simply right?</p><figure data-orig-width=\"1069\" data-orig-height=\"1051\" class=\"tmblr-full\"><img src=\"http://68.media.tumblr.com/e894efb55bb474284f42d4c44bca6b6c/tumblr_inline_oqin4mKBE21um4rwc_540.png\" alt=\"image\" data-orig-width=\"1069\" data-orig-height=\"1051\"></figure><p>Copyright: Precision Nutrition</p><p><br></p><p><br></p><p>Here is another visual rep to help see how an anytime (breakfast, lunch, dinner) plate should consist of:</p><figure data-orig-width=\"900\" data-orig-height=\"1150\" class=\"tmblr-full\"><img src=\"http://68.media.tumblr.com/1ad838ff1fa0671bcf9af1726a270e06/tumblr_inline_oqin8w4AVo1um4rwc_540.png\" alt=\"image\" data-orig-width=\"900\" data-orig-height=\"1150\"></figure><p>Copyright: Precision Nutrition</p><p>This second plate shows what a “post-workout” plate should consist of. Eat a post workout meal within 1 hour after your weight training or intense exercise session. By doing so, you will maximize your gains   This plate differs from the previous plate by taking advantage of the body’s metabolic response to exercise. After exercise, your body needs both carbs and protein to help rebuild your muscles and restore overall energy levels.</p><figure data-orig-width=\"900\" data-orig-height=\"1137\" class=\"tmblr-full\"><img src=\"http://68.media.tumblr.com/0d008d3bdb1d348e7397ca409c4badd5/tumblr_inline_oqin9stxxJ1um4rwc_540.png\" alt=\"image\" data-orig-width=\"900\" data-orig-height=\"1137\"></figure><p>Copyright: Precision Nutrition</p><p><br></p><p>At first, it may be a bit difficult to assess portion sizes, but practice makes perfect.  After a few meals, this method will become familiar and in no time this will be a breeze. Take it one meal and one day at a time; Rome wasn’t built overnight and neither will your body.<br></p><p><br></p><p><br></p><p><br></p><p>Copyright: Precision Nutrition</p>",
                        "tree_html": ""
                    },
                    "trail": [{
                        "blog": {
                            "name": "mackperformance",
                            "active": true,
                            "theme": {
                                "avatar_shape": "square",
                                "background_color": "#FAFAFA",
                                "body_font": "Helvetica Neue",
                                "header_bounds": 0,
                                "header_image": "https://assets.tumblr.com/images/default_header/optica_pattern_01.png?_v=f67ca5ac5d1c4a0526964674cb5a0605",
                                "header_image_focused": "https://assets.tumblr.com/images/default_header/optica_pattern_01.png?_v=f67ca5ac5d1c4a0526964674cb5a0605",
                                "header_image_scaled": "https://assets.tumblr.com/images/default_header/optica_pattern_01.png?_v=f67ca5ac5d1c4a0526964674cb5a0605",
                                "header_stretch": true,
                                "link_color": "#529ECC",
                                "show_avatar": true,
                                "show_description": true,
                                "show_header_image": true,
                                "show_title": true,
                                "title_color": "#444444",
                                "title_font": "Gibson",
                                "title_font_weight": "bold"
                            },
                            "share_likes": true,
                            "share_following": true,
                            "can_be_followed": true
                        },
                        "post": {"id": "161060679604"},
                        "content_raw": "<p>By Mackennon Klink, B.S., CSCS, PN1<br></p><p> </p><p>The goal of the Hand Size Portion Guide is to help you reach your nutrition and fitness goals without the tedious and somewhat difficult process of calorie counting.  This is a super simple and easy method to help keep calories in control and learn portion sizes.  The best part?  All you need is your hand.</p><p><br></p><p>The hand size methods works for a few reasons:</p><p>1.     Hands are portable.  Unlike food scales, your hands will always be with you at home, work, restaurants, social gatherings, etc.</p><p>2.     Hands are scaled to the individuals.  Generally speaking, bigger people need more food and tend to have bigger hands, therefore getting larger portion.  Smaller people need less food, tend to have smaller hands and therefore getting smaller portions.</p><p>3.     By using your hands as a guide, it will provide reasonable amounts of nutrition dense foods and their specific macronutrients (protein, carbohydrates, and fats) and calorie needs without having to weigh your food or using an app, like MyFitnessPal.  </p><p>In short, this guide will help you create a nutritional foundation or baseline without making it overly complicated.  Most people will start getting positive results by simply sticking to these simple recommendations.  As you progress, we can make the necessary adjustments to make your process faster or overcome any plateau that might occur.   </p><p><i><b>Total Daily Intake</b></i></p><p><b><br></b></p><p><b>For the entire day, Men should aim for: </b></p><ul><li><b>    Protein - 6-8 palms<br></b></li><li><b>    Vegetables - 6-8 fists<br></b></li><li><b>    Carb - 6-8 cupped handfuls<br></b></li><li><b>    Fat - 6-8 thumbs<br></b></li></ul><p><b><br></b></p><p><b> For the entire day, Women should aim for: </b></p><ul><li><b>    Protein - 4-6 palms<br></b></li><li><b>    Vegetables - 4-6 fists<br></b></li><li><b>    Carbs - 4-6 cupped handfuls<br></b></li><li><b>    Fat - 4-6 thumbs</b><br></li></ul><p><br></p><p>Here’s another way to view your nutrition intake <i>for each meal</i>.</p><p><b>Men</b></p><ul><li><b>Protein - 2 palms<br></b></li><li><b>Vegetables - 2 fists<br></b></li><li><b>Carbs - 2 cupped handfuls<br></b></li><li><b>Fats - 2 thumbs</b></li></ul><p><b> Women</b></p><ul><li><b>Protein - 1 palm<br></b></li><li><b>Vegetables - 1 fist<br></b></li><li><b>Carbs - 1 cupped handful<br></b></li><li><b>Fats - 1 thumb<br></b></li></ul><p><br></p><p>This will be your starting point.  This will allow you to get in the adequate food and calories to meet your goals. Remember, hands are scaled to you; a smaller person will need less food than a larger person.  Again, don’t worry about counting calories; we are focusing on developing healthy eating habits and controlling overall calorie intake.  You have to build a foundation before you begin building the house.  </p><p><b>Visual Guides</b></p><p><br></p><p>The picture below is your visual guide to determining your portion size.  Rather simply right?</p><figure data-orig-width=\"1069\" data-orig-height=\"1051\" class=\"tmblr-full\"><img src=\"http://68.media.tumblr.com/e894efb55bb474284f42d4c44bca6b6c/tumblr_inline_oqin4mKBE21um4rwc_540.png\" alt=\"image\" data-orig-width=\"1069\" data-orig-height=\"1051\"></figure><p>Copyright: Precision Nutrition</p><p><br></p><p><br></p><p>Here is another visual rep to help see how an anytime (breakfast, lunch, dinner) plate should consist of:</p><figure data-orig-width=\"900\" data-orig-height=\"1150\" class=\"tmblr-full\"><img src=\"http://68.media.tumblr.com/1ad838ff1fa0671bcf9af1726a270e06/tumblr_inline_oqin8w4AVo1um4rwc_540.png\" alt=\"image\" data-orig-width=\"900\" data-orig-height=\"1150\"></figure><p>Copyright: Precision Nutrition</p><p>This second plate shows what a “post-workout” plate should consist of. Eat a post workout meal within 1 hour after your weight training or intense exercise session. By doing so, you will maximize your gains   This plate differs from the previous plate by taking advantage of the body’s metabolic response to exercise. After exercise, your body needs both carbs and protein to help rebuild your muscles and restore overall energy levels.</p><figure data-orig-width=\"900\" data-orig-height=\"1137\" class=\"tmblr-full\"><img src=\"http://68.media.tumblr.com/0d008d3bdb1d348e7397ca409c4badd5/tumblr_inline_oqin9stxxJ1um4rwc_540.png\" alt=\"image\" data-orig-width=\"900\" data-orig-height=\"1137\"></figure><p>Copyright: Precision Nutrition</p><p><br></p><p>At first, it may be a bit difficult to assess portion sizes, but practice makes perfect.  After a few meals, this method will become familiar and in no time this will be a breeze. Take it one meal and one day at a time; Rome wasn’t built overnight and neither will your body.<br></p><p><br></p><p><br></p><p><br></p><p>Copyright: Precision Nutrition</p>",
                        "content": "<p>By Mackennon Klink, B.S., CSCS, PN1<br /></p><p>&nbsp;</p><p>The goal of the Hand Size Portion Guide is to help you reach your nutrition and fitness goals without the tedious and somewhat difficult process of calorie counting. &nbsp;This is a super simple and easy method to help keep calories in control and learn portion sizes. &nbsp;The best part? &nbsp;All you need is your hand.</p><p><br /></p><p>The hand size methods works for a few reasons:</p><p>1.&nbsp;&nbsp;&nbsp;&nbsp; Hands are portable. &nbsp;Unlike food scales, your hands will always be with you at home, work, restaurants, social gatherings, etc.</p><p>2.&nbsp;&nbsp;&nbsp;&nbsp; Hands are scaled to the individuals. &nbsp;Generally speaking, bigger people need more food and tend to have bigger hands, therefore getting larger portion. &nbsp;Smaller people need less food, tend to have smaller hands and therefore getting smaller portions.</p><p>3.&nbsp;&nbsp;&nbsp;&nbsp; By using your hands as a guide, it will provide reasonable amounts of nutrition dense foods and their specific macronutrients (protein, carbohydrates, and fats) and calorie needs without having to weigh your food or using an app, like MyFitnessPal. &nbsp;</p><p>In short, this guide will help you create a nutritional foundation or baseline without making it overly complicated. &nbsp;Most people will start getting positive results by simply sticking to these simple recommendations. &nbsp;As you progress, we can make the necessary adjustments to make your process faster or overcome any plateau that might occur. &nbsp;&nbsp;</p><p><i><b>Total Daily Intake</b></i></p><p><b><br /></b></p><p><b>For the entire day, Men should aim for:&nbsp;</b></p><ul><li><b>&nbsp; &nbsp; Protein -&nbsp;6-8 palms<br /></b></li><li><b>&nbsp; &nbsp; Vegetables -&nbsp;6-8 fists<br /></b></li><li><b>&nbsp; &nbsp; Carb -&nbsp;6-8 cupped handfuls<br /></b></li><li><b>&nbsp; &nbsp; Fat -&nbsp;6-8 thumbs<br /></b></li></ul><p><b><br /></b></p><p><b>&nbsp;For the entire&nbsp;day, Women should aim for:&nbsp;</b></p><ul><li><b>&nbsp; &nbsp; Protein - 4-6 palms<br /></b></li><li><b>&nbsp; &nbsp; Vegetables - 4-6 fists<br /></b></li><li><b>&nbsp; &nbsp; Carbs - 4-6 cupped handfuls<br /></b></li><li><b>&nbsp; &nbsp; Fat - 4-6 thumbs</b><br /></li></ul><p><br /></p><p>Here&rsquo;s another way to view your nutrition intake <i>for each meal</i>.</p><p><b>Men</b></p><ul><li><b>Protein -&nbsp;2 palms<br /></b></li><li><b>Vegetables -&nbsp;2 fists<br /></b></li><li><b>Carbs -&nbsp;2 cupped handfuls<br /></b></li><li><b>Fats -&nbsp;2 thumbs</b></li></ul><p><b>&nbsp;Women</b></p><ul><li><b>Protein -&nbsp;1 palm<br /></b></li><li><b>Vegetables - 1 fist<br /></b></li><li><b>Carbs - 1 cupped handful<br /></b></li><li><b>Fats - 1 thumb<br /></b></li></ul><p><br /></p><p>This will be your starting point. &nbsp;This will allow you to get in the adequate food and calories to meet your goals. Remember, hands are scaled to you; a smaller person will need less food than a larger person. &nbsp;Again, don&rsquo;t worry about counting calories; we are focusing on developing healthy eating habits and controlling overall calorie intake. &nbsp;You have to build a foundation before you begin building the house. &nbsp;</p><p><b>Visual Guides</b></p><p><br /></p><p>The picture below is your visual guide to determining your portion size. &nbsp;Rather simply right?</p><figure class=\"tmblr-full\"><img src=\"http://68.media.tumblr.com/e894efb55bb474284f42d4c44bca6b6c/tumblr_inline_oqin4mKBE21um4rwc_540.png\" class=\"\"/></figure><p>Copyright: Precision Nutrition</p><p><br /></p><p><br /></p><p>Here is another visual rep to help see how an anytime (breakfast, lunch, dinner) plate should consist of:</p><figure class=\"tmblr-full\"><img src=\"http://68.media.tumblr.com/1ad838ff1fa0671bcf9af1726a270e06/tumblr_inline_oqin8w4AVo1um4rwc_540.png\" class=\"\"/></figure><p>Copyright: Precision Nutrition</p><p>This second plate shows what a &ldquo;post-workout&rdquo; plate should consist of. Eat a post workout meal within 1 hour after your weight training or intense exercise session. By doing so, you will maximize your gains &nbsp; This plate differs from the previous plate by taking advantage of the body&rsquo;s metabolic response to exercise. After exercise, your body needs both carbs and protein to help rebuild your muscles and restore overall energy levels.</p><figure class=\"tmblr-full\"><img src=\"http://68.media.tumblr.com/0d008d3bdb1d348e7397ca409c4badd5/tumblr_inline_oqin9stxxJ1um4rwc_540.png\" class=\"\"/></figure><p>Copyright: Precision Nutrition</p><p><br /></p><p>At first, it may be a bit difficult to assess portion sizes, but practice makes perfect. &nbsp;After a few meals, this method will become familiar and in no time this will be a breeze. Take it one meal and one day at a time; Rome wasn&rsquo;t built overnight and neither will your body.<br /></p><p><br /></p><p><br /></p><p><br /></p><p>Copyright: Precision Nutrition</p>",
                        "is_current_item": true,
                        "is_root_item": true
                    }],
                    "can_like": false,
                    "can_reblog": true,
                    "can_send_in_message": true,
                    "can_reply": false,
                    "display_avatar": true
                }, {
                    "type": "text",
                    "blog_name": "mackperformance",
                    "id": 160986671424,
                    "post_url": "https://mackperformance.tumblr.com/post/160986671424/testing-blog",
                    "slug": "testing-blog",
                    "date": "2017-05-23 15:17:26 GMT",
                    "timestamp": 1495552646,
                    "state": "published",
                    "format": "html",
                    "reblog_key": "a7dsYGLr",
                    "tags": [],
                    "short_url": "https://tmblr.co/Z6nWrd2LxZQb0",
                    "summary": "Testing blog",
                    "recommended_source": null,
                    "recommended_color": null,
                    "note_count": 0,
                    "title": null,
                    "body": "<p>Testing blog</p><p><br/></p><figure class=\"tmblr-full\" data-orig-height=\"281\" data-orig-width=\"500\" data-tumblr-attribution=\"love-this-pic-dot-com:zl3lrskSwDA6ZwRB32M8LQ:ZJ8Urv1l5LBcb\"><img src=\"http://68.media.tumblr.com/6e8352db33ef8fd17e20c8526e855a5a/tumblr_nojdlnWAnG1rqak9yo1_500.gif\" data-orig-height=\"281\" data-orig-width=\"500\"/></figure>",
                    "reblog": {
                        "comment": "<p><p>Testing blog</p><p><br></p><figure class=\"tmblr-full\" data-orig-height=\"281\" data-orig-width=\"500\" data-tumblr-attribution=\"love-this-pic-dot-com:zl3lrskSwDA6ZwRB32M8LQ:ZJ8Urv1l5LBcb\"><img src=\"http://68.media.tumblr.com/6e8352db33ef8fd17e20c8526e855a5a/tumblr_nojdlnWAnG1rqak9yo1_500.gif\" data-orig-height=\"281\" data-orig-width=\"500\"></figure></p>",
                        "tree_html": ""
                    },
                    "trail": [{
                        "blog": {
                            "name": "mackperformance",
                            "active": true,
                            "theme": {
                                "avatar_shape": "square",
                                "background_color": "#FAFAFA",
                                "body_font": "Helvetica Neue",
                                "header_bounds": 0,
                                "header_image": "https://assets.tumblr.com/images/default_header/optica_pattern_01.png?_v=f67ca5ac5d1c4a0526964674cb5a0605",
                                "header_image_focused": "https://assets.tumblr.com/images/default_header/optica_pattern_01.png?_v=f67ca5ac5d1c4a0526964674cb5a0605",
                                "header_image_scaled": "https://assets.tumblr.com/images/default_header/optica_pattern_01.png?_v=f67ca5ac5d1c4a0526964674cb5a0605",
                                "header_stretch": true,
                                "link_color": "#529ECC",
                                "show_avatar": true,
                                "show_description": true,
                                "show_header_image": true,
                                "show_title": true,
                                "title_color": "#444444",
                                "title_font": "Gibson",
                                "title_font_weight": "bold"
                            },
                            "share_likes": true,
                            "share_following": true,
                            "can_be_followed": true
                        },
                        "post": {"id": "160986671424"},
                        "content_raw": "<p><p>Testing blog</p><p><br></p><figure class=\"tmblr-full\" data-orig-height=\"281\" data-orig-width=\"500\" data-tumblr-attribution=\"love-this-pic-dot-com:zl3lrskSwDA6ZwRB32M8LQ:ZJ8Urv1l5LBcb\"><img src=\"http://68.media.tumblr.com/6e8352db33ef8fd17e20c8526e855a5a/tumblr_nojdlnWAnG1rqak9yo1_500.gif\" data-orig-height=\"281\" data-orig-width=\"500\"></figure></p>",
                        "content": "<p><p>Testing blog</p><p><br /></p><figure data-tumblr-media-id=\"0\" class=\"tmblr-full\"></figure></p>",
                        "is_current_item": true,
                        "is_root_item": true
                    }],
                    "can_like": false,
                    "can_reblog": true,
                    "can_send_in_message": true,
                    "can_reply": false,
                    "display_avatar": true
                }],
                "total_posts": 2
            }
        };
        return {
            getRecentPosts: getRecentPosts,
            getPosts: getPosts,
            getPost: getPost
        };

        function getRecentPosts() {
            return getPosts(4);
        }
        
        function getPosts(limit, page) {
            if (USE_TEST_DATA) {
                return $q(function(resolve) {
                    resolve(testRecentPostsData);
                });
            } else {
                var params = {};
                if (limit) {
                    params.limit = limit;
                }
                if (page) {
                    params.offset = 8 * page;
                }
                 return $http({
                     url: API_SERVER + "/blog/posts",
                     params: params,
                     cache: blogsCache
                 }).then(function (response) {
                     return response.data;
                 }, function (err) {
                     console.error(err);
                 });
            }
        }
        
        function getPost(id) {
            if (USE_TEST_DATA) {
                return $q(function(resolve) {
                    resolve(testRecentPostsData);
                });
            } else {
                 return $http({
                     url: API_SERVER + "/blog/posts",
                     params: {"id" : id},
                     cache: blogsCache
                 }).then(function (response) {
                     return response.data;
                 }, function (err) {
                     console.error(err);
                 });
            }
        }
    }

    angular.module("mack").factory("Tumblr", Tumblr);

})();