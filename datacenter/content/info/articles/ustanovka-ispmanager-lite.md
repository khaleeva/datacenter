---
title: "Установка ISPmanager Lite"
pageTitle: "Установка ISPmanager Lite"
date: 2023-05-13T10:42:37+02:00 
draft: false 
description: "Установка ISPmanager Lite"
layout: "article"
text: "Панель управления личным серверов ISPmanager Lite разработана для того, что бы упростить администрирование вашего
сервера."
---

# Установка ISPmanager Lite

Панель управления личным серверов ISPmanager Lite разработана для того, чтобы упростить администрирование вашего
сервера (в том числе, создание и удаление сайтов, управление почтой, ftp и прочее). Полее подробную информацию вы можете
получить по ссылке.

После того, как вы оформили заказ на лицензию ISPmanager Lite в личном кабинете, оплатили ее и дождались перевода
статуса заявки в состояние "Активна", войдите на ваш сервер по протоколу ssh, например с помощью программы putty.

В качестве имени пользователя укажите root и затем введите пароль, который вам сообщили наши специалисты.

Введите следующие команды: **`http://download.ispsystem.com/install.sh sh./install.sh`**

Вы увидите следующее:

ISPsystem install v.4.4
`1. ISPmanager`

`2. BILLmanager`

`3. VDSmanager`

`4. DSmanager`

`5. DNSmanager`

`6. IPmanager`

`0. Exit`

Please choose software to install:

**Введите 1 и нажмите ввод.**

Далее:

`1. ISPmanager-Lite`

`2. ISPmanager-Pro`

`3. ISPmanager-Cluster`

`4. Back`

Please choose ISPmanager version:

**Введите 1 и нажмите ввод.**

Checking license ...

`1. ru.download.ispsystem.com`

`2. us.download.ispsystem.com`

`3. be.download.ispsystem.com`

Please choose mirror to install from:

**Введите 1 и нажмите ввод.**

`1. beta version - has the latest functionality`

`2. stable version - time-proved version`

Please choose version to install:

**Введите 2 и нажмите ввод.**

Дождитесь, пока ПО скачается.

Далее, вам будет задан примерно следующий вопрос:

The ISPmanager-Lite Setup Wizard guides you through the steps to configure your server. Your OS detected as
Debian-6.0.2. Do you wish to continue?

Нажмите ввод.

Возможно после этого вам будет задан следующий вопрос:

For proper configuration you need to have correct hostname. Please fix your hostname in edit field below:

Укажите полное dns-имя вашей vps, например vps1.primer.by

**Нажмите ввод.**

Далее, вам будет задан вопрос Choose installation type - **нажмите ввод** и следите за процессом установки.

После того, как установка завершится - зайдите в панель по адресу **`https://ваш.айпи.адрес.vps/manager/ispmgr`**

В качестве имени пользователя укажите root, в качестве пароля - пароль администратора сервера

Перед началом использования панели мы рекомендуем вам ознакомится с {{< info/link url="https://docs.ispsystem.ru/"
target="_blank" >}}документацией{{< /info/link >}}.
