import { setLocale, addMethod, object } from "yup";
import without from "lodash/without";

setLocale({
  mixed: {
    default: "نامعتبر است",
    required: "اجباری است",
    oneOf: "باید یکی از این مقادیر باشد: ${values}",
    notOneOf: "نباید یکی از این مقادیر باشد: ${values}",
    notType: "نوع ورودی نامعتبر است",
    defined: "باید تعریف شود",
  },
  string: {
    length: "باید دقیقا ${length} نویسه باشد",
    min: "حداقل ${min} نویسه وارد کنید",
    max: "حداکثر ${max} نویسه وارد کنید",
    matches: 'باید با موارد زیر مطابقت داشته باشد: "${regex}"',
    email: "باید یک ایمیل معتبر باشد",
    url: "باید یک URL معتبر باشد",
    uuid: "باید یک UUID معتبر باشد",
    trim: "دوطرف رشته فاصله نباشد",
    lowercase: "با حروف کوچک باشد",
    uppercase: "با حروف بزرگ باشد",
  },
  number: {
    min: "باید بزرگتر یا مساوی ${min} باشد",
    max: "باید کوچکتر یا مساوی ${max} باشد",
    lessThan: "باید کوچکتر از ${less} باشد",
    moreThan: "باید بزرگتر از ${more} باشد",
    notEqual: "نباید برابر با ${notEqual} باشد",
    positive: "باید یک عدد مثبت باشد",
    negative: "باید یک عدد منفی باشد",
    integer: "باید یک عدد صحیح باشد",
  },
  date: {
    min: "باید از ${min} به بعد باشد",
    max: "باید از ${max} به قبل باشد",
  },
  object: {
    noUnknown: "دارای کلیدهای نامشخص است: ${unknown}",
  },
  array: {
    min: "باید حداقل ${min} مورد داشته باشد",
    max: "باید حداکثر ${max} مورد داشته باشد",
  },
});

// https://runkit.com/anber/yup---at-least-one
addMethod(object, "atLeastOneRequired", function atLeastOneRequired(list, message) {
  // invariant(list.every(field => this.fields[field]), 'All required fields should be defined before calling atLeastOneRequired');
  return this.shape(
    list.reduce(
      (acc, field) => ({
        ...acc,
        [field]: this.fields[field].when(without(list, field), {
          is: (...values) => !values.some((item) => item),
          then: this.fields[field].required(message),
        }),
      }),
      {}
    ),
    list.reduce((acc, item, idx, all) => [...acc, ...all.slice(idx + 1).map((i) => [item, i])], [])
  );
});

export default () => "";
