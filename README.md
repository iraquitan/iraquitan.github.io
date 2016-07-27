[![Code Climate](https://codeclimate.com/github/iraquitan/iraquitan.github.io/badges/gpa.svg)](https://codeclimate.com/github/iraquitan/iraquitan.github.io)
# iraquitan.github.io
My personal GitHub page built with Jekyll.

## Table of contents
* [Requirements](#requirements)
* [Quick start](#quick-start)
* [Creator](#creator)
* [License](#license)

## Requirements
* Git
* [Ruby](https://www.ruby-lang.org/en/)
* [Bundler](http://bundler.io/)
* [Jekyll](https://jekyllrb.com/)

## Quick start
* Clone this repo `git clone https://github.com/iraquitan/iraquitan.github.io.git your-folder`.
* Change to the `/your-folder` directory.
* Run `bundle install` to install dependencies
* To test locally, you can run `bundle exec jekyll serve`
* To customize to your own data, you must change some fields in **_config.yml**.
    * _title_: Change to your new site title.
    * _email_: Change to your own email.
    * _description_: Change to your own site description.
    * _url_: Change to your own github user page repository `http://github-user.github.io`.
    * _timezone_: Change to your own timezone following this [list](https://www.wikiwand.com/en/List_of_tz_database_time_zones).
* To customize to your own data, you must change some fields in *_data* folder.
    * **people.yml**: Change to your own name, twitter handle, github user and linkedin user.
    * **profiles.yml**: Change the _username_ field in all items to your own profiles.
* To customize the favicon and brand image, you can generate yout onw favicon [here](http://realfavicongenerator.net/) and replace the contents on the *assets/img/favicons* folder
* To deploy, you need the following steps:
    * Remove the current remote by running `git remote rm origin`.
    * Then add your own github pages repository remote by running `git remote add origin https://github.com/user/repo.git`.
    * Then commit your customization changes and push to your remote master branch.

## Creator
**Iraquitan Cordeiro Filho**
* <https://github.com/iraquitan>
* <https://www.linkedin.com/in/iraquitan>
* <https://twitter.com/iraquitan_filho>

## License
The contents of this repository are covered under the [MIT License](LICENSE).
