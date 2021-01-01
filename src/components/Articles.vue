<template>
  <div id="articles">
    <div class="row articlesbg">
      <div class="col-sm-4">
        <div class="card">
          <div class="card-body">
            <div class="totalArticle"><i class="fas fa-file-alt">&nbsp;</i>{{catDetails[5]}}</div>
            <div style="text-align: center">
              <i :class="['fas fa-' + catDetails[2]]"></i>
            </div>
            <div class="card-title">{{ catDetails[1] }}</div>
            <div class="card-text">
              <span class="updated">Updated last {{getDateDiff(catDetails[3])}}</span>
            </div>
            <hr>
            <div class="description">
              <div>
              <i class="fas fa-info-circle"></i>
              </div>
              {{ catDetails[4] }}
            </div>
          </div>
        </div>
      </div>

      <div class="col-sm-8">
        <div class="accordion" id="accordionExample">
          <div
            class="accordion-item"
            v-for="article of filterItems(articles)"
            :key="article.id"
          >
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                :data-bs-target="['#collapseOne' + article.id]"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
              <i :class="['fas fa-' + article.icon]"></i>
                {{ article.title }}
              </button>
            </h2>
            <div
              :id="['collapseOne' + article.id]"
              class="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                {{ article.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "articlelist",
  props: ["catId", "catDetails"],
  data() {
    return {
      articles: [],
      search: "",
    };
  },
  //   props: [btnText],
  async created() {
    try {
      const res = await axios.get("http://localhost:9000/api/category/cat3");
      this.articles = res.data;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    filterItems(items) {
      let _this = this;
      console.log(this.search);
      return items.filter(function (item) {
        return item.categoryId == _this.catId && item.status == 'published';
      });
    },
    getDateDiff(dateUpdated) {
      var date1 = new Date();
      var jsonDate = dateUpdated;
      var date2 = new Date(jsonDate);
      var timeDiff = date1.getTime() - date2.getTime();
      timeDiff = timeDiff / (1000 * 3600 * 24);
      return Math.round(timeDiff);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
.articlesbg {
  background-color: #f8f9fa;
  padding: 10px;
}
.card-body i {
  font-size: 30px;
}
.card-body .totalArticle{
    text-align: right;
    font-size: 10px;
}
.card-body .totalArticle i{
  font-size: 10px;
}
.card-title {
  text-align: center;
  font-weight: bold;
  font-size: 12px;
}
.card .description{
  font-size: 8px;
  color:gray;
}
.card .description i{
  font-size: 15px;
}
.card .description div{
  text-align: center;
}
.card-text {
  text-align: center;
  font-size: 8px;
  color:gray;
}
.accordion-item i{
  padding-right: 15px;
}
.accordion-item .accordion-button{
  background-color: #fff;
}
.accordion-body{
  font-size: 12px;
}
.bcbg{
  background-color: #f8f9fa;
  font-size: 12px;
  padding-top: 10px;
}
.bcbg a{
  color: green;
  text-decoration:none;
}
</style>