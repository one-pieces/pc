<template>
  <div>
    <div class="wrapper news-detail">
      <div class="kv">
        <img :src="$t('news.detail.bannerImg')" alt="">
      </div>
      <div class="row main box-padding">
        <div class="col-sm-2 col-xs-12 side-column">
          <h3><span>{{ $t('pages.news.label') }}</span></h3>
          <h4>{{ $t('news.detail.title') }}</h4>
        </div>
        <div class="col-sm-8 col-xs-12 detail">
          <div class="date"><span>{{ $t('pages.public.time') }}</span>{{news.createdAt | dateFormat}}</div>
          <div v-html="$t('news.detail.contentHTML')"></div>

          <br /><br /><br />
          <template v-for="item of $t('news.detail.additions')">
            <p>
              <strong >{{ item.title }}</strong><br />
              <strong>{{ item.content }}</strong><br />
              <a :href="item.link" target="_blank">{{ item.link }}</a>
            </p>
            <br /><br />
          </template>
        </div>
      </div>
    </div>

    <scroll-top></scroll-top>

    <div class="other box-padding">
      <op-swiper :slide-list="recommendedNews" :options="swiperOptions">
        <router-link slot-scope="{ item }" :to="{ name: 'news.detail', params: { id: item.id } }">
          <div>
            <img :src="item.bannerImg">
            <div class="hover">
              <div class="box">
                <div class="middle">{{item.title}}</div>
              </div>
            </div>
          </div>
          <div class="circle"></div>
        </router-link>
      </op-swiper>
    </div>
  </div>
</template>
<script type="text/ecmascript-6" lang="babel">
  import newsApi from '@/api/news';
  import dateFormat from '@/filters/date';
  import scrollTop from '@/components/scroll-top';
  import opSwiper from '@/components/op-swiper';

  export default {
    data() {
      return {
        news: {
          id: '1',
          title: '哈哈哈哈',
          createdAt: '2017-10-10 10:20:30',
          bannerImg: 'https://dummyimage.com/800X450/CC9',
          contentHTML: '',
          information: '', // 信息
          acknowledgments: [{ // 鸣谢
            name: '聚美丽',
            link: 'http://www.jumeili.cn/News/View/21422.html'
          }],
          enable: 1, // number, 是否启用，1是 0否
        },
        swiperOptions: {
          slidesPerView: 4,
          spaceBetween: 30,
          pagination: '',
          effect: 'slide'
        },
        recommendedNews: [{
          id: '3',
          title: '中国化妆品设计的国际首金',
          createdAt: '2017-10-10 10:20:30',
          bannerImg: 'http://test.tron-m.com/oib-api/resource/getResources.do?id=67',
          contentHTML: '',
          information: '', // 信息
          acknowledgments: [{ // 鸣谢
            name: '聚美丽',
            link: 'http://www.jumeili.cn/News/View/21422.html'
          }],
          enable: 1, // number, 是否启用，1是 0否
//        }, {
//          id: '4',
//          title: '首届CBF召开，专注于美妆消费者前瞻性视觉洞察',
//          createdAt: '2017-10-10 10:20:30',
//          bannerImg: 'http://test.tron-m.com/oib-api/resource/getResources.do?id=68',
//          contentHTML: '',
//          information: '', // 信息
//          acknowledgments: [{ // 鸣谢
//            name: '聚美丽',
//            link: 'http://www.jumeili.cn/News/View/21422.html'
//          }],
//          enable: 1, // number, 是否启用，1是 0否
//        }, {
//          id: '4',
//          title: '首届CBF召开，专注于美妆消费者前瞻性视觉洞察',
//          createdAt: '2017-10-10 10:20:30',
//          bannerImg: 'http://test.tron-m.com/oib-api/resource/getResources.do?id=68',
//          contentHTML: '',
//          information: '', // 信息
//          acknowledgments: [{ // 鸣谢
//            name: '聚美丽',
//            link: 'http://www.jumeili.cn/News/View/21422.html'
//          }],
//          enable: 1, // number, 是否启用，1是 0否
//        }, {
//          id: '4',
//          title: '首届CBF召开，专注于美妆消费者前瞻性视觉洞察',
//          createdAt: '2017-10-10 10:20:30',
//          bannerImg: 'http://test.tron-m.com/oib-api/resource/getResources.do?id=68',
//          contentHTML: '',
//          information: '', // 信息
//          acknowledgments: [{ // 鸣谢
//            name: '聚美丽',
//            link: 'http://www.jumeili.cn/News/View/21422.html'
//          }],
//          enable: 1, // number, 是否启用，1是 0否
//        }, {
//          id: '4',
//          title: '首届CBF召开，专注于美妆消费者前瞻性视觉洞察',
//          createdAt: '2017-10-10 10:20:30',
//          bannerImg: 'http://test.tron-m.com/oib-api/resource/getResources.do?id=68',
//          contentHTML: '',
//          information: '', // 信息
//          acknowledgments: [{ // 鸣谢
//            name: '聚美丽',
//            link: 'http://www.jumeili.cn/News/View/21422.html'
//          }],
//          enable: 1, // number, 是否启用，1是 0否
        }]
      };
    },
    filters: {
      dateFormat
    },
    components: {
      scrollTop,
      opSwiper
    },
    methods: {
      async fetchNews() {
        const { id } = this.$route.params;
        this.news = await newsApi.get(id);
        this.recommendedNews = (await newsApi.recommendedList({ id }))
          .map(item => Object.assign(item, item[this.$route.params.lang]));
        ['zh_cn', 'en'].forEach((lang) => {
          this.$i18n.mergeLocaleMessage(lang, {
            news: {
              detail: Object.assign({}, this.news, this.news[lang])
            }
          });
        });
      }
    },
    watch: {
      $route() {
        this.fetchNews();
      }
    },
    created() {
      this.fetchNews();
    }
  };
</script>
