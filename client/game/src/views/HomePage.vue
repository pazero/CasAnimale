<script setup>
import { onMounted } from "@vue/runtime-core";

const left = Math.floor(Math.random() * 5);
const right = Math.floor(Math.random() * 5);

const games = [
  {
    id: 1,
    name: "Quiz about animals",
    href: "quiz",
    imageSrc: "quiz.png",
    imageAlt: "quiz word icon",
    bg: "bg-gray-100",
  },
  {
    id: 2,
    name: "Offered services",
    href: "services",
    imageSrc: "services.png",
    imageAlt: "handshake img",
    bg: "bg-blue-100",
  },
  {
    id: 3,
    name: "Hangman",
    href: "hangman",
    imageSrc: "hangman.png",
    imageAlt: "hangman game icon",
    bg: "bg-gray-100",
  },
  {
    id: 4,
    name: "Interesting Facts",
    href: "facts",
    imageSrc: "interest.png",
    imageAlt: "interesting facts img",
    bg: "bg-gray-100",
  },
  {
    id: 5,
    name: "Create your account",
    href: "http://localhost:3000/register",
    imageSrc: "register.png",
    imageAlt: "new user img",
    bg: "bg-blue-100",
  },

  {
    id: 6,
    name: "Memory",
    href: "memory",
    imageSrc: "memory.png",
    imageAlt: "memory img",
    bg: "bg-gray-100",
  },
  {
    id: 7,
    name: "Info pet",
    href: "infopet",
    imageSrc: "infopet.png",
    imageAlt: "infopet img",
    bg: "bg-gray-100",
  },
  {
    id: 8,
    name: "e-commerce",
    href: "http://localhost:3000/compra",
    imageSrc: "shop.png",
    imageAlt: "ecommerce img",
    bg: "bg-blue-100",
  },
  {
    id: 9,
    name: "Funny Videos",
    href: "videos",
    imageSrc: "funny.png",
    imageAlt: "funny video img",
    bg: "bg-gray-100",
  },
  {
    id: 10,
    name: "Shop showcase",
    href: "shop",
    //todo: cambia
    imageSrc:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMSEhUTEhMWFhUXGRgaGBYYGRcVFRgZHhkZGhgXFxgYHSggGBolGxkYIjEhJSkrLi4uFyAzODMsNygtLysBCgoKDg0OGxAQGi0lICUtLS0tLS0wLS0tLi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOAA4AMBIgACEQEDEQH/xAAcAAEAAwADAQEAAAAAAAAAAAAABQYHAgMEAQj/xABFEAACAQIDBAcECAMGBgMBAAABAgADEQQSIQUGMUETIlFhcYGRBzKhwRQjQlKCsbLRYnKSJGOiwuHwFTM0o9LiQ1NzFv/EABoBAQADAQEBAAAAAAAAAAAAAAABAgQDBQb/xAA6EQACAQIDBAgFAQYHAAAAAAAAAQIDEQQhMRJBUXEFE2GRobHB0SIygeHwUhQ0QmLC8QYVIzNygrL/2gAMAwEAAhEDEQA/ANxiIgCIiAIiIAiIgCcHqBRdiAO0mw9TIDfPeMYGhnsDUc5KYN7X4lmtrlUXPfoNL3meYhunPSVahrsdczG6j+RRoo7gJxq1lTOtOk557jWqW0aLGy1qbHsDqT6Az1zDcRRQ6ZR6Cduz9uYjDEdDVYAfYY56Z7sp4fhse+co4tb1+eB1eFe5/nibbErG629tPF/VsOjrAe5e6sBxKHn3rxHeNZZ5qTTV0ZpRcXZiIiSQIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIBR/ajsKpiaCPSBZqJYlRqSrAXIA4kZRpxtfwON5GHI+X7ifpyR2M2NhqpzVaFJzzZkUnzJF5xqUtp3ud6dfYVmj87qKnLP8AGdq16i8bnx1/1mv4zaGyKBsKdB2HKnSWpr2ZgMoPiZH4rfnB5SBgiV4WdaQB7rLmnB0orJyX59Tuq0npBmfYHGkkMhKOpBBHEEcCDNv3Y2r9Kw6VSLMbhx2Ops1u48R3ETItobNWtVFXD0hhlI1pls4v2gADIO65HZaXD2f4urRz4bojULMagdSBTXqqv1l9VF14i5OumhihJRm4p3uRiFtQ2rZryNEieFmrjW1Nv4QWU+TEEE+IHlPHTrI4Vq1UoztkWn0hpZXsT0QykF3sCeJva4sDNpiJqJ4FLU3VSxZHuFJ1ZWAJy3+0pAOp1BHE3098AREQBERAEREAREQBERAEREAREQBERAEREA8W0toU8PTarVbKi+pPAADmSdAJl28O8NbFkhiadHlRB4jtqke8e7gO+1zIb87SNbEmnf6uhYW5GoRdm77KQB+LtlXrvMNes77KNtCirbT+h48TVCi54TxYOsXrLfgNbcuGl+3n6Tz4quXbu4CS/wBCNFEuVuSHIBViAVsobKTlOo048ZSnSun2InE4lUnBP+KSj3/i7yXStL77P8po1WHvdJY9tgiEDw1J8zM0SrJfYG3amFcslmVrB0JsGA4EH7LC51seOo4WrQmozuy9am5RsjTtv4B8Rh6lGnV6JnUqKmUVMt+PVJF9L8xIPC7vYcPQo4hzWfDU6DqzuQzVFLqKzKGsx6o1a9sonTV3/TL1KD5v4igT1Uk/CVTFYk12Z61nZjc3HV7AADewA0A/M3M2TxEY6ZmWFCT1yLzjt58KK6UzWHUJZmW7qDlKhCVuAesSezLrxk9hMVTqrmpurr2qQR8JkJ2fQbjTF+0aSD3m2g2HyYfD169Mv1nKVqgCoDyCsBmY3HgDIhiFN2SZzlQnFtuStyafm0zfWrKDYsAey4v6Ttn5jp0MMfepKxPFmuzk9pYm9++80H2V7xuuJ+gvUZ6Toz0C5LvTZLZqWY6lCpuL8MpE0FbGtxEQQIiIAiIgCIiAIiIAiIgCInj2ljkoU2qVDZV9SeQHaSYIbSV2eyfCbTPKXtBcM5aiCDbIubLlH8RscxMjsZvJiK+tSoaVL7qdUt3KeJ77mw+BtsmGXSNG3w3fh330RH70VRTxeIDkKS+cBiASrKCDa/iPKVXaOPzdVeHM9v8ApJrbTjEFeqECDKigXsCbnM3vPc63J4k9pEi12brwHqT8LD85inhpbbaN1DpjDOn8crNdjz5WXnZ9h5MDh8xHYfy+0fl4mTNZLqQOOWw8eXxijRC8OPbz7vAd05zXRp7EbM8DpHHPE1lOGSj8vHjf6vwsRWK2gEanm0V+fYeQM96VJE7wYTPTdRxBzL5/+15DbF28VslTXsJ+fYZglQdnbVP+z7j66lio1Ixm9JK69V3l1SrO5Ksi6GIVuB8uc9CvM9jSSiVpnm+NZhjKh7kt4ZR87y6JVkNvPsc4gB6dukUWtwzLxtfkRrbxnbDzUZ5nGvByjkU9McRLDuXjz9OovmZBTzsWUAsBkK8G0IuwuDxF5XKOCqM+RUYtzFuHjyA75dt39jjDqbkGo3vEcB2IO7v5z00keHjMSqMGv4novV77GybP3up3C1iFB92qtzTfxvrTbtU8O3hLMjhgCCCDwI1B8DMNRyL9h4jkfGc134qbNall69Ko+VqbGyqObA2468vOGjHhekJSlsSV+Wv38+ZucSM2Jtilikz0zw95T7ynsI+fOScqerGSklKLumIiILCIiAIiIAiIgHyZjvtt4Yl1pUj9Wh97grNwv/KBfXvPdJ3fGvXqk4fDXOVS1bKVBAPuqSe0Am3E6TOZaKPG6RxL/wBqKy3vj2Llv7i3bQ2dhcDTAqAYjEEXCm4RR94gcR46nuF5Va9ZnYsxufQAcgANAB2CcCb8f98h8J8lkebVqqeUVZLRL1erfMRESTiIiIB58ZTuL+v8p/Y2PkZDUsMhyM6BjSe9r5b2fgSOX7T1YnB1PpIql/qRRZWS54a304cwb90lMLgDkXNxJW/4mF/zmDF/DJSWr9Ptkfdf4VkpUqsJZxS8ZNu3NOO12XOjamBSpTNakMrA9YaDX7QblexveeLC0KxuM4BHI9nI317/AEliapTpGsjnWpSui2JuwzL5cRqeyRlL3/w6+un5mcqCUpJSWTv5fY79NSlQpznRdnG3DNNr6aM6Bh6331Hlf/LOQwBPv1HPcOqs9sTcqFNbj4+fSuMmrOduSS8kddGiqCyhQO759s7Iidjz223diVnf+jmw6sPsuL+BBH52lmkZvNQz4WsP4S39PW+UhnbDT2K0JdqJnd/a70jTr0jqUUkcmUgEq3dNl2Zjkr0lqpwYX7weYPeDpPz9unXz4SkewFP6SQPgBNI9n+3Ojb6NUOjm6Hsbmp8eXf4yGrq5uwVV0azoy0u1yd/XTuNGiIlD3BERAEREASD3q2o2HojoherUYJTHHrHnbnb8yJOTxYjAo9SnUYXanmy9gLAAm3bYaeMHOqpODUXZ8eHbz4dpC1qC4PAuGfrsrZnNyXqMD5nXQdwmXS4+0jaOaqlBTpTGZvFuA8l/VMj3h2pWeo9HDnKKaF6rjQ6C5APLkNNbnuMujxsTHrq3VQsowVr7lx9FxbLXEqu46MwNTpGK6q6Mb2cEEOp7CpP+s9uz9o1Dja9CoeqBmQW4C44dtw3wkpmSphnGU4p32fpw9+4nYnypUCgsxAABJJ4ADiTKq218ViWIwahKam2duJPne3hbxhspSoyqXasktW8kWuJVKO28ThnVMaoKNoKq2079NCO6wMtQMJkVaMqdr6PRrNM68V7h/wB6aZvhO8bVI2pRwZA6NqYZTzL5WIufu2BFu20q+9ldlr4QAkKamo5HrILHt0JHnPJt9mp7QwxDtYimAbi6qajKyg24WJ9ZnrUtuV+yx9D0RjY4ah1bveT28luSs081wTW7NptWu7dtq9TEl0Iyp1Lm+th1iO0ecUqWW/Mnif8AfASnbw1nxGIXB0TZV0bjlvxJbtAHxnfubjqgqVMLVJJp3IvrbKwUqDzGoIlqdKMNFnxM/SWIr4uMqjlaPzKG9R0TfF2WfbpbdbYkPvLtkYamLAGo1woPAW4se4fORu7e8FV63QYkWZhdTlym9r2I7xqP9Z2ueVHC1JUnVSy8e23ItURIreTav0aldReoxyovHXttzt8xJONOEpyUY6slZxq0wylTwIIPmLSgYRK7Yvo6tZ1raMpuxXPYPkYdlrjTTxmgyE7nXEUOpatK91fL8zKxuC5FKpTPFKh07Li35qZZweyVTYH1ePxVLk31g9Qw+DmWuIlsYk6rf6kn3o1rdHa/0mgCx+sTR+820bzGvjeT0qHs8o0zQ6RVtUuyuRfra5luOBIDDWW+UZ9BhpSnRjKWrX59+0RESDuIiIAkfXxop06tVvdS/nl0I8c1x6RW2rSSqlFnAqOLquvxPAXsbdtpUN8NpD6N0SnRqrDvK07ZvV9ZNjPXrxpxck9L9+5eJQNv7UKpVxD6tYt4sToPC5AkFuns8/Rqjvq9fMSTxIOg9bk+c69+qhK0aC8atT8rAfFh6SyUKQRVVeCgAeAFhL7zwG3DDrjJ3+i92U72c1P+cv8AIf1A/Kera7dHtLDvydQh8SWX/Ms6tzVC4nFp2MfQVCP2nbvyuX6PW+5U/Yj9Bldxsm74yS/Urd8cvGx376VmKUsOhs1aoB+G4A8rkekm8DhFo01poLKot49pPeTrK/i26TadFeK00zefWIPxWWiW3mOteNKnDs2nzbfoeDbuAFeg9O2trr3OPd/bzng3Mx/S4cKfep/VnwHu/DT8MnpVNi0+h2jXp/ZqAuPUMLeF3HlD1FL46M4cPiXk/DM5b6Cz4Vuyp80nl37bo62HqWvl1t25WU2+M9W/2lOi3ZU+V/lOn2i0upSbsZx6gH5SHvNmFzdFf816nzcKgXatiH1LHKD3k53/ADWfMQeh2op4CqBf8YK/rEmdz6YGFpW55ifHMZCb9g06uHrAaj81YMB8TG4rGTnipwW9Sj3LLyOOX6XtIg606PLl1Dw86h9J2b7J0VahiF4ggH8BDD1BPpO3cCldKtU6lmAv4C5+LfCd+/1K+GB+7UU+oI+cjcW2lHFwp7ktnvWfiWRWuLjgZVaZ+lbRJ408ONOzMD+ea/8AQJL4PF5cEtU/ZoBvMU/3EjtxMPbDmofeqVCb8yBp+eb1lmZKS6uE57/lX1+3mRu3OptKiw+0aPxbIfgJd5UN70AxWEftZR6VAf8ANLfC3k4l3p0n/LbuZVcf9XtSi3AVFAPeesnyWWqVbfcZDh6/3Kn7MP0mWkGN5Wu9qnTl2Ndz9mizbkbeTDO61Tam9utxCsOZ7iDx7hNMw1cOuZTca+oJBHqDMNmiezfHF6dSmxuabAjwYfuD6yJI29G4p3VF6Z28/cukREoe0IiIBlu+7suPZlJDAIVPYQoIt5yBxOLZwob7ObzLElj8fhLXvfhs20EH3lB/pVj/AJZS1nRaHzOLuqs+Db9H7FW271tpYVTwADeeZz/lEtUqu3jkx+Ec8DZb9+Yj/OJZd4KFWjgKuLtlQWRCTYszHKMg521P4TF7Fp05VY0owWsf6nnyKPu1ih/xGoQdKhqgd/Wzj9MsO+lHPhG7VKt8j8CZF7S3Xq4DC7Px7WtVbM1r5gGs6BtOdMH4y27c2c4SpSqKVLU2AvzuNCDwI7xIWeRqxkeprwqJZZLufsU7cyr0+OzE8aKA+IFJGt53n6Dw+42EX3lZ/wCZiP02n5y9nZtiXbspk/4lPyn62ldEa4UKcq04yinsqKV89zKLvxsqhRwy9HSVSXUZgOtazG2Y68pjO8Q6LGYWvyJCMfO35OfSbd7TG+opj+O/opHzmL790L4bMOKVFPrdfzIkrQy1lFYxRtk1bvTXqdHtCH9nQ/3o/Q0+b/C+GpHsdfijf6TjvpVFTBUqn3mpN603/ed+9QzYBT3UT6gD5yeJwoZKlf8AW1/5Pfuof7JR8D+p5G+0KnfDo3ZUHoVb5gT3bmn+x0vxfrac97NnVK2FqdFTZyhVyFBayjQk24CxPpJehWDtjf8Au/NnTuTTtg1P3i5/xEfKct9BfBv3ZD/iX95ad0dyMWcFQbKFumbKzFXsSSLgjQ2PORW+OyatKhWSrTKno2IvqDbXqkaHhykbhOFSniOslFpbWu7UqxxB/wCE3/hyf9zL+Unt20y4WiP7sH11+cr+HoE7JYfzN5Cpf5S8+z3d+rjcHSemyhVAQlib3XQgAAwi9alKcZRgr/6ktORQvaFX69EA9ZQzeFyLfpMuGDripTRxwZFb1F5C7N3WbamI2k6tdcNTdaRAuHcZhTA10DZGPO2YS1+yrd9cds9X6Yq9N2psuW4FrMvMfZZZCaud62DqSoQjFZx5b833MrW+OHz4Sp2rZ/Q6/AmevYVfpMPSftpi/iND8QZctuez/EdE6owqqyMpA6ragj3Tp6GZxuNVPQvSYWalUIKniL66j+YN6S18zJOjUjh2pq2zK/0at5lklt9mtS2IdeTU7+YZbfOVKWn2c/8AV/gb81iWhzwX7xDmafEROZ9OIiIBUduUh/xPCE/aV19Fb/ymbPTKkqeKkg+INjNQ3nW2KwNTsqMv9WUfvM92+mXFVh/eP8WJ+cvE8DpCDTb/AJvOMfVEPjN2m2gUoIwSrclHN7KQCTe2oFhy7BJc+z/a+MajT2riqRwdBgSiWUlVFur0dNeK6ZmNwCT4y3s/t9MX+V7en7XmkbToGpRqUwbF1ZQe8ggSJam7o2/Ucc3buRRfaI+Fx+zMRQoOrPRTpaagEH6rU5LjXqZl0+9OrcHaFDa2zKVF2H0ijTCtzdCCyI/fmCAkd/hIPYrdFiqfSdTK9nDaAA9Vw1+ViZ1bg4SnsnaGMPSq2FqKOiZczOevdVt/CpYEk66WvrY1Z5DDYuFalLrrLdb7Pu5orGB3afCYrEZyLXZQovcXa+vcOR58Z+jqLXVT2gH4TId6doU8RXarSDAMBfMACWAtfQnkBNY2a16VM9qIf8Ih6FcDParVLu+iT4pX/GVP2jUXqHD06aszE1CAoN9Ag5ePGV5/Z/iKtMrURLMLFGbU+ajT1mr98+yLnapgadSo6km75aZWskud8j8+b1bt1BR+ilOjYBcgPu2XhYi9xa4uJ5cZskvhBh7gsKaqGOgzLax8LibfvZsgYjDsAPrFBZDzvzXwI09OyZKJdO55WKpzw01FO6vtLjfLXuRw3I3eqFaWGBBbrFmFyq6knxte3ebTbdlbNp4emKdJbAcTzY82Y8zK17N8AFovWPF2yj+Vf/a/oJYtt7SXDUXqsL24D7zHQD1lXwPSwdNRg689ZXbfBfmZIzxbU2dTxFNqVVQysPMd4PIzLKu8+Lar0vTMCDoo0Qd2TgR469803YO0xiaK1QLE6MOxhoR/vkRIasdKGMp4huKXfvRkO1thjCs2FZRkAygcmQ3sfMX87yN3V3d2ytOth9nYpEw7Mc2bKGGYWvfo2ZTYcUI4X0mne0nBA0qdYDVGyk9zcPRgP6p5PZe/WxC91M/F7/KWeauYqClQxfVJ/DLPwb87q57NzthUti7PyVGzG+es6gnM7EKMo45R1VHhfS8z72dby4bZ20cdhXfJhqzh6BKkAEt1EsASLo4F/wC75TXN7aOfB1l/hv8A0kN8p+fd5NhvVq0q1EAspUMCbCwNw3lrfnwlbG2rierrKErKLTz7fb3P0phsQlRQ6MGU8GUgg+YmT4n2dVsPXx+LFRWp1Gz00Fy9ixd82lhlzG1ibgcp6txdqNSxK07nJVOUryzW6rAdvLwPdNPxFMMjKeBBHqLQ1YijVji6DTVr5Pnu9zDZbfZsl8S57KZ+LL/rKjNO3C2OaNE1XFnq2NuYX7I8Tx8x2S8tDx+j4OdeLW7NlriInM+lEREAqftEuMOlReKVFI9Db42lM3uA+lO492oEdfBkB/O80HfTCGpg6oHEAN/SQT8AZnOPY1cNQfnTz038AcyfBmH4JZHi9Ix+JrsT7m0/CVzq2Hj/AKPiKdXkrdb+UizfAn0myUqgYBlIIIBBHAg8CJjGydmviKq0qY1PE8lXmx7pI4PbmKwLtRDAhGIKMLroeK8wDx0NtZLVzlgsV1EXtp7LevbbP8+9tE2tu9h8R/zE6331OVvM8/O8ou8e6FTDKalNjUpjjpZlHaQNCO8eks+wN8qddhTqL0dQ6DW6MewHke4+ploZQRY6iVu0ejKhh8XHajrxWv1+5hM2jYLXw1E/3afpEynePZ4w+JqUx7oN1/lOoHle3lNQ3Wa+Eo/yAemktIx9GRcas4vVejOe39pjDUGqkXIsFHax0A8P2kPuVvDUxRqJVC5lswKiwINwRa54H85y9oo/sZ7nT5iV32atbEuO2mfgy/vItkaateccXCCeVtOd/Y0uYtvBheixNamOAbTwOo+BE2mZX7QaOXGM33lVvQZflEdSvSsL0lLg/Bp/Yu+5S2wVHwY+rtIr2lVD0NNeRcn0Gn5yT3Ie+Cpd2cejtI/2lUicMjD7Li/gVYfnb1kbzpV/crr9K8kZtL/7MapyV05Ao39QYH9AlAmkezjAFKD1WFjVYW7woIB9S0vLQ8vo5N4hW4PyJPfVb4KtfkFPo6mVT2ZP9fVXtS/ow/8AKWnfiplwVXvyD1dZT/Z09sXbtRh8QflKr5TdiGv22ny9zRNpUc9Gqn3kYeqkTEVM3iVTDbh4VTdi79xbKP8ACAfjEWXx+EnWcXC2V73+hW9wdmNUxAq26lK5vyJIsFHrfyHbNIxtcU6bueCqzHyBM+4aglNQiKFUcABYCVffDaOcrgqR+sqsA5H2RcGx7yNT3A9sjVnWnBYSjxfm3okVTczYn0mtdx9XTsz9jH7KefE9w75rUid3NkDC0ejGpLMxPM3Ol/whR5SWhu5bBYfqKST1eoiIkGsREQDhUQEEEXBFiO6ZBisGaFWthW4E2BPaOtTbzBI/GZsUpHtE2TmVcQo1TqtbsJ0byJ/xd0lMwdIUdqntrWPk9ff6E3uvsinh6IyEOXAZnHBuy3YovoJFb5brtXPS0AOktZl0GcDgQToGA014i3ZKzu3vO+FbK13pMbleak8WX5jge6aXs7aFKumek4Ze7iO5hxB7jJd0VoSoYmj1SVrbuFt64rtz7d5lNHdnFu2UUGU/eYZVHfmPymvUVIUAm5AAJ7TbUzskDvJvFTwqEXDVSOqnzbsX8+Uhu50o4elhIyld/Xs5cyk+0Bw2Ma32VUHxsT+REvG5bXwVHwYejMJk1eszszubsxJJ7SdTLnu1vdQw+Gp0qiuWUt7oUjVmYcWHIyzWVjzsJiIftE6k3ZO/msudif39S+Cq9xQ/41/eVP2cn+1fgb/LJHb2+OHr4epTVagLDQkKBcEEXsx7JG+zr/qvwN8o3HWpUhUxlOUGnlbLm/c1CZr7Sl/tFM9tMfqaaVM19pZ/tCf/AJj9TSsdTX0l+7vmvMl/ZtjQaL0b9ZDmA/hb/wBgfUS14vCpVRqbgMrCxB5zGdm4+ph6gqUjZh5gjmGHMS/YDf2gwHTA0252u6+VtfhJaM+CxlPqlTqNK2WejX9sjuo7i4VWzHOw+6zDL52AJHnLMiBQABYDQAaADkBIJt88EBfpv8FS/wCmQ+1N/UAIw6En7zaKO8Le587SM2aVWwtFPZcVys/I4e0naQsmHB1vmfuHBQfG5PkJB7iPbG0+8OP+2T8pB167VGLuxZmNyTxJknuk9sZQP8RHqpHzl7ZHj9e6uJjU7VbldfnM2GVba2+lKhUekabsyGxtlC8AeJN+B7JZKtVV1ZgviQPzmV78OjYpmpsrBgpupDC9spFxz0+MpFXZ7OPrTo09qDzv7nt2pv1XqArSUUged8zeRIAHp5yE2Jtc4asa2XpGysOsTxP2r2JJ4+NzI6TO6eyjicQot1EILnlYHQeJIt69kvZJHh9bWrVY53lfLs7baGr4V2KKXFmKgsBwBtqB5z0RE5n1AiIgCIiAJ1VaQZSrC4IIIPAg8QZ2xAMd3l2K2ErFNTTbWm3aOw944eh5yNw2Iem2amzI3apKn4TYttbKTFUjTfxVuatyYf71mS7U2dUw9Q06gsRwPJhyZe6dE7nzmNwjoS2o/K9Ox8PY9D7yYthY4h7d1gfUAGRjG5JOpPEnUnvJnyJJjlOUvmbfNt+YiIgqJ7NlbSqYep0lK2axGouLG19PKeOIJjJxd1qT9TfLGn/5QPBE+amROPx9Su2eq5drWuQBpqbaAdpnmiC861SeUpN82xERBzEREAT6ptqNDPkQD4RfU8e3nPsASS2FsSriny0xZR7zn3V/c90Ewg5StFXbJTdfdQ4peld8tO5Fhqxtx46Ad+s0TZmzaWHTJSXKOJ5kntJOpM5bMwKUKS0k91R5k8ST3k3PnPZObZ9NhsLCjFZfFvfmIiJBqEREAREQBERAEjNt7IpYqnkqD+Vh7yntB+XOScQVlFSVpK6Ma27sOrhHtUF1PuuPdb9j3H4yMm44mglRSjqGU8QRcGUbbu4hF3wpuP8A62Ovkx4+B9ZdPieHiejZQ+KlmuG/7+fMo8TsxGHemxWorKw5MCD8eXfOuWPMEREAREQBERAERPVhdm1qqlqdJnUcSqkjy7T3CCUm3ZK55Ykxgd2MVVI+pZQftMMoHrr6CX3d3dWlhrM31lX75Gi/yjl48ZDaRroYKrVellxfsVPdrdB65z1g1OkORBVn8AfdXv8ATtmkYXCpSQJTUKo4AaCd8SjZ7uHwsKCtHXe97EREg0CIiAIiIAiIgCIiAIiIAiIgHkx2ApVly1UVx3jh4HiPKVXaG4FJtaNRqf8ACeuvyI9TLrElM41cPTq/PG/n36mV4rcjFpwVag7VYX9GtO7/APg8QVuGTwYsp89DNOiNpmX/ACyhff3mQbT3ZxNAAslwTbq3b1sNPORLUmHFWHkZus+Sdo5T6Kg38Mmlyv7GD3krsylgjrXxDjtUUz+q5v6TWquCpM2Zqas3DMVUm3ZcidgwyfcX0EnaKQ6LcXfaT5p+kkUjBYjY9EZgQx7WV3P9NrD0Em8FvPTqlVo0azg2GYIFUDtJJAAk4MMg4IvoJ2ytzfTozhknFL+WNv6n5H2IiQaRERAEREAREQBERAP/2Q==",
    imageAlt: "shop showcase img",
    bg: "bg-gray-100",
  },
];

const advs = [
  {
    name1: "BUY SOME SUPPLIES",
    name2: "FOR YOUR PETS HERE!",
    href: "http://localhost:3000/compra",
    bg: "bg-red-100",
    current: false,
  },
  {
    name1: "PLAY WITH US,",
    name2: "A QUIZ IS WAITING FOR YOU!",
    href: "http://localhost:5173/quiz",
    bg: "bg-green-100",
    current: false,
  },
  {
    name1: "PLAY A HANGMAN",
    name2: "MATCH HERE!",
    href: "http://localhost:5173/hangman",
    bg: "bg-indigo-100",
    current: false,
  },
  {
    name1: "READ SOME USER'S",
    name2: "POSTS HERE",
    href: "http://localhost:3000/forum",
    bg: "bg-yellow-100",
    current: false,
  },
  {
    name1: "WATCH SOME FUNNY",
    name2: "ANIMALS VIDEO!",
    href: "http://localhost:5173/quiz",
    bg: "bg-blue-100",
    current: false,
  },
];
</script>

<template>
  <div
    class="flex xl:flex-row flex-col"
    style="flex: 1 1 auto"
    data-theme="lemonade"
  >
    <!-- adv left -->
    <div
      class="hidden xl:flex xl:flex-col xl:h-full xl:w-20 flex-row text-gray-600 font-semibold bg-[url(bgGame.jpg)] bg-right-top"
      style="flex: 1 1 auto; min-width: 10rem"
    >
      <a
        :key="advs[left].name1"
        :href="advs[left].href"
        class="flex p-1 px-5 self-center justify-center mt-20 mx-1 text-md leading-relaxed text-center bg-blue-100 hover:bg-gray-700 hover:text-white"
        style="border-radius: 0; flex: 0 1 auto"
        :aria-current="undefined"
      >
        {{ advs[left].name1 }}<br />{{ advs[left].name2 }}
      </a>
    </div>

    <!-- GAMES -->
    <div
      class="mx-auto max-w-2xl py-4 px-4 sm:py-8 sm:px-6 xl:max-w-7xl xl:px-8"
    >
      <div
        class="flex justify-center font-semibold normal-case text-6xl md:text-7xl xl:text-8xl md:pb-4"
        style="flex: 0 1 auto"
      >
        GAMES
      </div>

      <div class="grid grid-cols-2 xl:grid-cols-3">
        <a v-for="game in games" :key="game.id" :href="game.href" class="card">
          <div
            :class="[game.bg, 'card-body']"
            style="padding: 2rem; margin: 1rem"
          >
            <p class="card-title hidden">{{ game.name }}</p>
            <img
              :src="game.imageSrc"
              :alt="game.imageAlt"
              class="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
        </a>
      </div>
    </div>

    <!-- adv right -->
    <div
      class="flex justify-center xl:justify-start xl:flex-col xl:h-full xl:w-20 flex-row font-semibold text-gray-600 bg-[url(bgGame.jpg)] bg-left-top"
      style="flex: 1 1 auto; min-width: 10rem"
    >
      <a
        :key="advs[right].name1"
        :href="advs[right].href"
        class="flex p-1 px-5 self-center justify-center xl:mt-20 xl:mx-1 text-md leading-relaxed text-center bg-blue-100 hover:bg-gray-700 hover:text-white my-20"
        style="border-radius: 0; flex: 0 1 auto"
        :aria-current="undefined"
      >
        {{ advs[right].name1 }}<br />{{ advs[right].name2 }}
      </a>
    </div>
  </div>
</template>

<!--
  - applicazione a se stante
  - scopo: presentare l'azienda
  - offre momenti di svago e istruzione ai proprietari degli animali
  - deve invogliare ad usare i servizi a pagamento!

  TODO LIST:
  
  - NO autenticazione obbligatoria

  - permettere all'utente di descrivere i propri pet con specie, nome, sesso, età, eventuali condizioni mediche. Non solo cani e gatti!

  - ampia disponibilità di semplici giochi a tema animale

  - pagine informative e di curiosità specifiche sugli animali dell'utente (API REST)

  - pagine di visualizzazione dei prodotti di e-commerce acquistabili
  
  - pagine di visualizzazione dei servizi commerciali offerti da CasAnimale

  - permette di passare velocemente all'app front-office per accedere ai servizi e all'e-commerce
-->
