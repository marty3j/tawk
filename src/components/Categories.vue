<template>
  <div id="home">
    
    <div class="row categoriesbg">
      <div
        class="col-sm-4"
        v-for="category of filterItems(categories)"
        :key="category.id"
        @click="
          showArticles(
            category.id,
            category.title,
            category.icon,
            category.updatedOn,
            category.description,
            category.totalArticle
          )
        "
      >
        <div class="card">
          <div class="card-body">
            <div style="text-align: center">
              <i :class="['fas fa-' + category.icon]"></i>
            </div>
            <div class="card-title">{{ category.title }}</div>
            <div class="card-text">
              <span class="articles">{{ category.totalArticle }} Articles</span
              ><br />
              <span class="updated"
                >Last Updated {{ getDateDiff(category.updatedOn) }} days
                ago</span
              >
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
  props: ["btnText"],
  data() {
    return {
      categories: [],
      search: "",
      categoriesDetails: [],
    };
  },
  async created() {
    try {
      const res = await axios.get("http://localhost:9000/api/categories");
      this.categories = res.data;
    } catch (e) {
      console.error(e);
    }

  },
  methods: {
    filterItems(items) {
      let _this = this;
      
      if (_this.btnText != "") {
        return items.filter(function (item) {
          return item.title.toLowerCase().includes(_this.btnText.toLowerCase()) &&  item.enabled == true;
        });
      } else {
        return items.filter(function (item) {
          return item.enabled == true;
        });
      }
    },

    showArticles(
      catId,
      catTitle,
      icon,
      catUpdatedOn,
      catDescription,
      catTotArticle
    ) {
      //alert(catId);
      var _this = this;

      _this.categoriesDetails = [
        catId,
        catTitle,
        icon,
        catUpdatedOn,
        catDescription,
        catTotArticle,
      ];
     this.$emit("updatecatId", _this.categoriesDetails);
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
.card {
  min-height: 120px;
  margin: 10px;
  padding: 10px;
}
.card-body i {
  font-size: 30px;
}
.card-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
}
.card-text {
  /*position: absolute;*/
  font-size: 10px;
  text-align: center;
  bottom: 5px;
  width: 100%;
}
.categoriesbg {
  background-color: #f8f9fa;
}
</style>