<template>
    <div class="compatibility-box">
        <common-banner
        :pc-src="'/img/compatibility/compatibility_banner.png'"
        :mobile-src="'/img/compatibility/compatibility_banner.png'"
        :inside-name="'SUPPORT'"
        :outside-name="i18n.compatibility.COMPATIBILITY"
        ></common-banner>
        <div class="compatibility-content">
            <el-tabs v-model="tabActiveName" @tab-click="handleTabClick">
              <!-- 整机 -->
                <el-tab-pane :label="i18n.compatibility.HARDWARE" name="hardware">
                    <!-- 筛选行 -->
                    <el-form :inline="true" :model="formData" class="compatibility-filter">
                        <el-form-item :label="i18n.compatibility.OS">
                            <el-select class="pc-select" 
                                v-model="formData.os" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareOSOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.os" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.OS">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareOSOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.ARCHITECTURE">
                            <el-select class="pc-select" 
                                v-model="formData.architecture" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareArchitectureOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.architecture" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.ARCHITECTURE">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareArchitectureOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="CPU">
                            <el-select class="pc-select" 
                                v-model="formData.cpu" 
                                @change="hardwareChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareCpuOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.cpu" 
                                @change="hardwareChange" 
                                placeholder="CPU">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in hardwareCpuOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.SEARCH_LABEL" class="search-box">
                            <el-input 
                                v-model="formData.keyword"
                                class="pc-search"
                                @keyup.enter.native='hardwareChange()'
                                :placeholder="i18n.compatibility.HARDWARE_SEARCH_PLACEHOLDER"
                            >
                                <i slot="suffix" class="icon-search" @click="hardwareChange()"></i>
                            </el-input>
                            <el-input
                                v-model="formData.keyword"
                                class="mobile-search"
                                @keyup.enter.native='hardwareChange()'
                                :placeholder="i18n.compatibility.HARDWARE_SEARCH_PLACEHOLDER"
                            >
                                <i slot="suffix" class="icon-search" @click="hardwareChange()"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <!-- 表格 -->
                    <el-table
                        v-loading.fullscreen="tableLoading"
                        class="table-pc"
                        :data="hardwareTableData"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column prop="architecture" :label="i18n.compatibility.ARCHITECTURE" width="90"></el-table-column>
                        <el-table-column prop="hardwareFactory" :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.VENDOR" width="110"></el-table-column>
                        <el-table-column prop="hardwareModel" :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.MODEL" width="160"></el-table-column>
                        <el-table-column prop="cpu" label="CPU" width="150"></el-table-column>
                        <el-table-column prop="osVersion" :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.OS" width="190"></el-table-column>
                        <el-table-column prop="date" :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.DATE" width="110"></el-table-column>
                        <el-table-column prop="productInformation" :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.COMPATIBILITY_CONFIGURATION" width="220">
                            <template slot-scope="scope">
                                <a
                                    class="table-link"
                                    @click="go(scope.row.id)"
                                >{{ i18n.compatibility.HARDWARE_TABLE_COLUMN.COMPATIBILITY_CONFIGURATION2}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column prop="friendlyLink" :label="i18n.compatibility.HARDWARE_TABLE_COLUMN.REFERRENCE" width="90">
                            <template slot-scope="scope">
                                <a
                                    class="table-link"
                                    target="_blank"
                                    @click="goInstall(scope.row.friendlyLink)"
                                >{{ i18n.compatibility.LINK}}</a>
                            </template>
                        </el-table-column>
                    </el-table>
                    <ul class="table-mobile" v-loading.fullscreen="tableLoading">
                        <li class="item" v-for="(item, index) in hardwareTableData" :key="index">
                            <ul>
                                <li>
                                    <span>{{i18n.compatibility.ARCHITECTURE}}:</span>
                                    {{item.architecture}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.HARDWARE_TABLE_COLUMN.VENDOR}}:</span>
                                    {{item.hardwareFactory}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.HARDWARE_TABLE_COLUMN.MODEL}}:</span>
                                    {{item.hardwareModel}}
                                </li>
                                <li>
                                    <span>CPU:</span>
                                    {{item.cpu}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.HARDWARE_TABLE_COLUMN.OS}}:</span>
                                    {{item.osVersion}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.HARDWARE_TABLE_COLUMN.DATE}}:</span>
                                    {{item.date}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.HARDWARE_TABLE_COLUMN.COMPATIBILITY_CONFIGURATION}}:</span>
                                    <a
                                        class="table-link"
                                        @click="go(item.id)"
                                    >{{ i18n.compatibility.HARDWARE_TABLE_COLUMN.COMPATIBILITY_CONFIGURATION2 }}</a>
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.HARDWARE_TABLE_COLUMN.REFERRENCE}}:</span>
                                    <a
                                        class="table-link"
                                        target="_blank"
                                        @click="goInstall(item.friendlyLink)"
                                    >{{ i18n.compatibility.LINK }}</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </el-tab-pane>
                <!-- 板卡 -->
                <el-tab-pane :label="i18n.compatibility.DRIVE" name="drive">
                     <el-form :inline="true" :model="formData" class="compatibility-filter">
                        <el-form-item :label="i18n.compatibility.OS">
                            <el-select class="pc-select" 
                                v-model="formData.os" 
                                @change="driverChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in driverOSOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.os" 
                                @change="driverChange" 
                                :placeholder="i18n.compatibility.OS">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in driverOSOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.ARCHITECTURE">
                            <el-select class="pc-select" 
                                v-model="formData.architecture" 
                                @change="driverChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in driverArchitectureOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.architecture" 
                                @change="driverChange" 
                                :placeholder="i18n.compatibility.ARCHITECTURE">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value="all"></el-option>
                                <el-option
                                    v-for="(item, index) in driverArchitectureOptions"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.SEARCH_LABEL" class="search-box">
                            <el-input 
                                v-model="formData.keyword" 
                                class="pc-search"
                                :class="{'pc-search-en':$lang !== 'zh'}"
                                @keyup.enter.native='driverChange()'
                                :placeholder="i18n.compatibility.DRIVE_SEARCH_PLACEHOLDER"
                            >
                                <i slot="suffix" class="icon-search" @click="driverChange()"></i>
                            </el-input>
                            <el-input 
                                v-model="formData.keyword" 
                                class="mobile-search"
                                @keyup.enter.native='driverChange()'
                                :placeholder="i18n.compatibility.DRIVE_SEARCH_PLACEHOLDER"
                            >
                                <i slot="suffix" class="icon-search" @click="driverChange()"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-table
                        v-loading.fullscreen="tableLoading"
                        class="table-pc"
                        :data="driverTableData"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column prop="architecture" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE" width="110"></el-table-column>
                        <el-table-column prop="driverName" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_NAME" width="115"></el-table-column>
                        <el-table-column prop="os" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS" width="190"></el-table-column>
                        <el-table-column prop="version" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.VERSION"  width="115"></el-table-column>
                        <el-table-column prop="type" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.TYPE" width="85" ></el-table-column>
                        <el-table-column prop="driverDate" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_DATE" width="115"></el-table-column>
                        <el-table-column prop="chipVendor" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_VENDOR" width="115"></el-table-column>
                        <el-table-column prop="boardModel" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.BOARD_MODEL" width="160"></el-table-column>
                        <el-table-column prop="chipModel" :label="i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_MODEL" width="115"></el-table-column>
                    </el-table>
                    <ul class="table-mobile" v-loading.fullscreen="tableLoading">
                        <li class="item" v-for="(item, index) in driverTableData" :key="index">
                            <ul>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.ARCHITECTURE}}:</span>
                                    {{item.architecture}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_NAME}}:</span>
                                    {{item.driverName}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_OS}}:</span>
                                    {{item.os}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.VERSION}}:</span>
                                    {{item.version}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.TYPE}}:</span>
                                    {{item.type}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.DRIVE_DATE}}:</span>
                                    {{item.driverDate}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_VENDOR}}:</span>
                                    {{item.chipVendor}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.BOARD_MODEL}}:</span>
                                    {{item.boardModel}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.DRIVE_TABLE_COLUMN.CHIP_MODEL}}:</span>
                                    {{item.chipModel}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </el-tab-pane>
                <!-- 开源软件 -->
                <el-tab-pane :label="i18n.compatibility.SOFTWARE" name="software">
                    <el-form :inline="true" :model="formData" class="compatibility-filter">
                        <el-form-item :label="i18n.compatibility.ARCHITECTURE">
                            <el-select class="pc-select" 
                                v-model="formData.architecture" 
                                style="width:150px;"
                                @change="softwareChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value=""></el-option>
                                <el-option
                                    v-for="(item, index) in softwareOptionsArch"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.architecture" 
                                @change="softwareChange" 
                                :placeholder="i18n.compatibility.ARCHITECTURE">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value=""></el-option>
                                <el-option
                                    v-for="(item, index) in softwareOptionsArch"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.SOFTWARETYPE">
                            <el-select class="pc-select" 
                                style="width:180px;"
                                v-model="formData.type" 
                                @change="softwareChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value=""></el-option>
                                <el-option
                                    v-for="(item, index) in softwareOptionsType"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.type" 
                                @change="softwareChange" 
                                :placeholder="i18n.compatibility.SOFTWARETYPE">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value=""></el-option>
                                <el-option
                                    v-for="(item, index) in softwareOptionsType"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.ADAPTIVE" >
                            <el-select class="pc-select" 
                                style="width:180px;"
                                v-model="formData.os" 
                                @change="softwareChange" 
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value=""></el-option>
                                <el-option
                                    v-for="(item, index) in softwareOptionsOs"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select" 
                                v-model="formData.os" 
                                @change="softwareChange" 
                                :placeholder="i18n.compatibility.ADAPTIVE">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value=""></el-option>
                                <el-option
                                    v-for="(item, index) in softwareOptionsOs"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.SEARCH_LABEL" class="search-box">
                            <el-input 
                                v-model="formData.keyword"
                                class="pc-search"
                                @keyup.enter.native='softwareChange()'
                                :placeholder="i18n.compatibility.SOFTWARE_SEARCH_PLACEHOLDER"
                            >
                                <i slot="suffix" class="icon-search" @click="softwareChange()"></i>
                            </el-input>
                            <el-input
                                v-model="formData.keyword"
                                class="mobile-search"
                                @keyup.enter.native='softwareChange()'
                                :placeholder="i18n.compatibility.SEARCH_LABEL"
                            >
                                <i slot="suffix" class="icon-search" @click="softwareChange()"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-table
                        v-loading.fullscreen="tableLoading"
                        class="table-pc"
                        :data="softwareTableData"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column prop="arch" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.ARCHITECTURE" width="110"></el-table-column>
                        <el-table-column prop="softwareName" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARENAME" width="200"></el-table-column>
                        <el-table-column prop="os" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SYSTEM" width="150"></el-table-column>
                        <el-table-column prop="version" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.VERSION" width="110"></el-table-column>
                        <el-table-column prop="type" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARETYPE" width="120"></el-table-column>
                        <el-table-column prop="property" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.PROPERTIES" width="150"></el-table-column>
                        <el-table-column prop="downloadLink" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.DOWNLOADLINK" width="100">
                             <template slot-scope="scope">
                                <a
                                    class="table-link"
                                    target="_blank"
                                    :href="scope.row.downloadLink"
                                >{{ i18n.compatibility.LINK}}</a>
                            </template>
                        </el-table-column>
                        <el-table-column prop="license" :label="i18n.compatibility.SOFTWARE_TABLE_COLUMN.PUBLICKLICENSE" width="180"></el-table-column>
                    </el-table>
                    <ul class="table-mobile" v-loading.fullscreen="tableLoading">
                        <div class="wait" v-if="!softwareTableData">暂无数据</div>
                        <li class="item" v-for="(item, index) in softwareTableData" :key="index">
                            <ul>
                                <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.ARCHITECTURE}}:</span>
                                    {{item.arch}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARETYPE}}:</span>
                                    {{item.type}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.SOFTWARENAME}}:</span>
                                    {{item.softwareName}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.VERSION}}:</span>
                                    {{item.version}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.PROPERTIES}}:</span>
                                    {{item.property}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.DOWNLOADLINK}}:</span>
                                    <a
                                        class="table-link"
                                        target="_blank"
                                        :href="item.downloadLink"
                                    >{{ i18n.compatibility.LINK }}</a>
                                </li>
                                 <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.SYSTEM}}:</span>
                                    {{item.os}}
                                </li>
                                 <li>
                                    <span>{{i18n.compatibility.SOFTWARE_TABLE_COLUMN.PUBLICKLICENSE}}:</span>
                                    {{item.license}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </el-tab-pane>

                <!-- 商业软件 -->
                <el-tab-pane :label="i18n.compatibility.BUSINESS_SOFTWARE" name="businessSoftware">
                    <el-form :inline="true" :model="formData" class="compatibility-filter">
                        <el-form-item :label="i18n.compatibility.ADAPTIVE" >
                            <el-select class="pc-select"
                                style="width:180px;"
                                v-model="formData.osName"
                                @change="businessSoftwareChange"
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value=""></el-option>
                                <el-option
                                    v-for="(item, index) in businessSoftwareOptionsOs"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select"
                                v-model="formData.os"
                                @change="businessSoftwareChange"
                                :placeholder="i18n.compatibility.ADAPTIVE">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value=""></el-option>
                                <el-option
                                    v-for="(item, index) in businessSoftwareOptionsOs"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.BUSINESS_TESTING_ORGANIZATION" >
                            <el-select class="pc-select"
                                style="width:180px;"
                                v-model="formData.testBy"
                                @change="businessSoftwareChange"
                                :placeholder="i18n.compatibility.SELECT_PLACEHOLDER">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value=""></el-option>
                                <el-option
                                    v-for="(item, index) in businessSoftwareOptionsTestBy"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                            <el-select class="mobile-select"
                                v-model="formData.testBy"
                                @change="businessSoftwareChange"
                                :placeholder="i18n.compatibility.BUSINESS_TESTING_ORGANIZATION">
                                <el-option :label="i18n.compatibility.SEARCH_ALL" value=""></el-option>
                                <el-option
                                    v-for="(item, index) in businessSoftwareOptionsTestBy"
                                    :key="index"
                                    :value="item"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label="i18n.compatibility.SEARCH_LABEL" class="search-box">
                            <el-input
                                v-model="formData.keyword"
                                class="pc-search"
                                @keyup.enter.native='businessSoftwareChange()'
                                :placeholder="i18n.compatibility.BUSINESS_SOFTWARE_SEARCH_PLACEHOLDER"
                            >
                                <i slot="suffix" class="icon-search" @click="businessSoftwareChange()"></i>
                            </el-input>
                            <el-input
                                v-model="formData.keyword"
                                class="mobile-search"
                                @keyup.enter.native='businessSoftwareChange()'
                                :placeholder="i18n.compatibility.SEARCH_LABEL"
                            >
                                <i slot="suffix" class="icon-search" @click="businessSoftwareChange()"></i>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <!-- PC端 -->
                   <el-table
                        v-loading.fullscreen="tableLoading"
                        class="table-pc"
                        :data="businessSoftwareTableData"
                        stripe
                        style="width: 100%"
                    >
                        <el-table-column prop="productName" :label="i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SOFTWARENAME" width="200"></el-table-column>
                        <el-table-column prop="productVersion" :label="i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.VERSION" width="110"></el-table-column>
                        <el-table-column prop="companyName" :label="i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.VENDOR" width="220"></el-table-column>
                        <el-table-column prop="osName" :label="i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SYSTEM" width="240"></el-table-column>
                        <el-table-column prop="serverTypesList" :label="i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SERVER_NAME" width="150">
                            <template slot-scope="scope">
                                <p v-for="(it,idx) in scope.row.serverTypesList" :key="idx">{{it}}</p>
                            </template>
                        </el-table-column>
                        <el-table-column prop="testOrganization" :label="i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.TESTING_ORGANIZATION" width="200"></el-table-column>
                    </el-table>
                    <!-- 移动端 -->
                    <ul class="table-mobile" v-loading.fullscreen="tableLoading">
                        <div class="wait" v-if="!businessSoftwareTableData">暂无数据</div>
                        <li class="item" v-for="(item, index) in businessSoftwareTableData" :key="index">
                            <ul>
                                <li>
                                    <span>{{i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SOFTWARE_NAME}}:</span>
                                    {{item.softwareName}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.VERSION}}:</span>
                                    {{item.version}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.VENDOR}}:</span>
                                    {{item.vendor}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SYSTEM}}:</span>
                                    {{item.osName}}
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.SERVER_NAME}}:</span>
                                    <p v-for="(it,idx) in item.serverTypesList" :key="idx">{{it}}</p>
                                </li>
                                <li>
                                    <span>{{i18n.compatibility.BUSINESS_SOFTWARE_TABLE_COLUMN.TESTING_ORGANIZATION}}:</span>
                                    {{item.testingOrganization}}
                                </li>
                            </ul>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
            <!-- 分页 -->
            <el-pagination
                class="compatibility-pagination"
                background
                @current-change="pageChange"
                :page-size="formData.pageSize"
                :current-page="formData.page"
                :layout="paginationLayout"
                :total="total"
                :hide-on-single-page="pageValue"
            ></el-pagination>
            <div class="bottomBanner" v-show="tabActiveName==='hardware' || tabActiveName==='drive'">
                <div class="bottomBanner-content">
                    {{i18n.compatibility.HARDWARE_OEC_DETAIL.TEXT}}
                    <a @click="goToHareware()" class="bottom-link">
                        {{i18n.compatibility.HARDWARE_OEC_DETAIL.TITLE}}.
                    </a>
                </div>
            </div>
            <div class="bottomBanner" v-show="tabActiveName==='software'">
                <div class="bottomBanner-content">
                    {{i18n.compatibility.SOFTWARE_OEC_DETAIL.TEXT}}
                    <a @click="goToSoftware()" class="bottom-link">
                        {{i18n.compatibility.SOFTWARE_OEC_DETAIL.TITLE}}.
                    </a>
                </div>
            </div>
            <div class="bottomBanner" v-show="tabActiveName==='businessSoftware'">
                <div class="bottomBanner-content">
                    {{i18n.compatibility.BUSINESS_SOFTWARE_OEC_DETAIL.TEXT}}
                    <a @click="goToBusinessSoftware()" class="bottom-link">
                        {{i18n.compatibility.BUSINESS_SOFTWARE_OEC_DETAIL.TITLE}}.
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import commonBanner from "./../common/banner.vue";
import { 
    hardwareList,
    hardwareOSOptions,
    hardwareArchitectureOptions,
    hardwareCpuOptions,
    driverList, 
    driverOSOptions, 
    driverArchitectureOptions,
    softwareOptions,
    businessSoftwareOptions,
    softwareList,
    businessSoftwareList
    } from "../../api/compatibility";

let that = null;

const locationMethods = {
    // 整机列表
    getHardwareList(params) {
        that.tableLoading = true;
        hardwareList(params)
        .then(data => {
            that.tableLoading = false;
            if(data.totalRecords) {
                that.total = data.totalRecords;
                that.hardwareTableData = data.list.sort((a,b) => {
                    return new Date(b.date).getTime() - new Date(a.date).getTime()
                });
            } else {
                that.total = 0;
                that.hardwareTableData = [];
            }
        })
        .catch(err => {
            that.$message.error(err);
             that.tableLoading = false;
        })
    },
    // 板块列表
    getDriverList(params) {
        that.tableLoading = true;
        driverList(params)
        .then(data => {
            that.tableLoading = false;
            if(data.totalRecords) {
                that.total = data.totalRecords;
                 that.driverTableData = data.list.sort((a,b) => {
                    return new Date(b.driverDate).getTime() - new Date(a.driverDate).getTime()
                });
            } else {
                that.total = 0;
                that.driverTableData = [];
            }
        })
        .catch(err => {
            that.$message.error(err);
             that.tableLoading = false;
        })
    },
    // 开源软件列表
    getSoftwareList(params) {
        that.tableLoading = true;
        softwareList(params)
        .then(data => {
            that.tableLoading = false;
            if(data) {
                that.total = data.total;
                let oldArray = data.info;
                let newArray=[];
                for(let i = 0;i < that.targetArray.length;i++){
                    for(let j = 0;j < oldArray.length;j++){
                       if(oldArray[j].softwareName[0] == that.targetArray[i]){
                           newArray.push(oldArray[j])
                       }
                    }
                };
                that.softwareTableData = newArray
            } else {
                that.total = 0;
                that.softwareTableData = [];
            }
        })
        .catch(err => {
            that.$message.error(err);
             that.tableLoading = false;
        })
    },

    // 商业软件列表
    getBusinessSoftwareList(params) {
        that.tableLoading = true;
        businessSoftwareList(params)
        .then(data => {
            that.tableLoading = false;
            if(data.code == '200') {
                that.businessSoftwareTableData = data.result.map(e=>{
                    e.osName = e.osName + ' ' + e.osVersion;
                    e.serverTypes = e.platformTypeAndServerModel.map(item=>{
                        return item.serverTypes
                    })
                    return e
                })
                that.businessSoftwareTableData.forEach(e=>{
                     e.serverTypesList = [];
                   e.serverTypesList = e.serverTypes.reduce(function (a, b) {
                        return a.concat(b)
                    })
                })
            } else {
                that.total = 0;
                that.businessSoftwareTableData = [];
            }
        })
        .catch(err => {
            that.$message.error(err);
             that.tableLoading = false;
        })
    }
}

export default {
    data() {
        that = this;
        return {
            isSoft:false,
            tabActiveName: 'hardware',
            hardwareOSOptions: [],
            hardwareArchitectureOptions: [],
            hardwareCpuOptions:[],
            driverOSOptions: [],
            driverArchitectureOptions: [],
            softwareOptionsOs:[],
            softwareOptionsArch:[],
            softwareOptionsType:[],
            businessSoftwareOptionsOs:[],
            businessSoftwareOptionsArch:[],
            businessSoftwareOptionsTestBy:[],
            formData: {
                keyword: '',
                os: '',
                cpu:'',
                architecture: '',
                testOrganization:'',
                page: 1,
                pageSize: 10,
                type:'',
                lang:'zh'
            },
            hardwareTableData: [],
            softwareTableData:[],
            businessSoftwareTableData:[],
            driverTableData: [],
            tableLoading: false,
            total: 0,
            pageValue: true,
            targetArray:[]
        };
    },
    components: {
        commonBanner,
    },
    computed: {},

    created() {},

    mounted() {
        let lang = '';
        if(window.location.pathname.indexOf('/en/') !== -1) {
            lang = 'en';
        } else if (window.location.pathname.indexOf('/ru/') !== -1) {
            lang = 'en';
        } else {
             lang = 'zh';
        }
        this.formData.lang = lang;
        this.initData(this.formData);

        // 下拉选项
        hardwareOSOptions({lang: lang})
        .then(data => {
            if(data && data.length > 0) {
                this.hardwareOSOptions = data;
            }
        })
        hardwareArchitectureOptions({lang: lang})
        .then(data => {
            if(data && data.length > 0) {
                this.hardwareArchitectureOptions = data;
            }
        })
        hardwareCpuOptions({lang: lang})
        .then(data=>{
            if (data && data.length > 0) {
                this.hardwareCpuOptions = data;
            }
        })
        driverOSOptions({lang: lang})
        .then(data => {
            if(data && data.length > 0) {
                this.driverOSOptions = data;
            }
        })

        driverArchitectureOptions({lang: lang})
        .then(data => {
            if(data && data.length > 0) {
                this.driverArchitectureOptions = data;
            }
        })
        softwareOptions({})
        .then(data => {
            this.softwareOptionsOs =data.OS;
            this.softwareOptionsArch = data.Arch;
            this.softwareOptionsType = data.Type.filter(value =>{
                return value!==""
            });
        })
        businessSoftwareOptions({})
        .then(data => {
            this.businessSoftwareOptionsOs = data.result.osNames;
            this.businessSoftwareOptionsTestBy = data.result.testOrganizations;
        })
        this.sortList()
    },
    methods: {
        sortList() {
            let arr = Array.from({length:10}).map((item,index)=>{
                 return String(index);
            });
            for(let i = 0 ; i < 26;i++){
                this.targetArray.push(String.fromCharCode(65+i))
                this.targetArray.push(String.fromCharCode(97+i))
            }
            this.targetArray = [...this.targetArray,...arr]
        },
        initData(params) {
            if(this.tabActiveName === 'hardware') {
                locationMethods.getHardwareList(params);
            } else if(this.tabActiveName === 'drive') {
                locationMethods.getDriverList(params);
            } else if(this.tabActiveName=== 'software') {
                locationMethods.getSoftwareList(params)
            } else if(this.tabActiveName=== 'businessSoftware') {
                locationMethods.getBusinessSoftwareList(params)
            }
        },
        handleTabClick(tab, event) {
            let lang = '';
            if(window.location.pathname.indexOf('/en/') !== -1) {
                lang = 'en';
            } else if (window.location.pathname.indexOf('/ru/') !== -1) {
                lang = 'en';
            } else {
                lang = 'zh';
            }
            this.formData = {
                type:'',
                keyword: '',
                os: '',
                osName: '',
                architecture: '',
                page: 1,
                pageSize: 10,
                lang:lang
            }
            this.initData(this.formData);
        },
        pageChange(value) {
            this.formData.page = value;
            this.initData(this.formData);
        },
        // 硬件筛选
        hardwareChange() {
            this.formData.page = 1;
            locationMethods.getHardwareList(this.formData);
        },
        // 开源软件筛选
        softwareChange() {
            this.formData.page = 1;
            locationMethods.getSoftwareList(this.formData);
        },
        // 商业软件筛选
        businessSoftwareChange() {
            this.formData.page = 1;
            locationMethods.getBusinessSoftwareList(this.formData);
        },
        // 驱动筛选
        driverChange() {
            this.formData.page = 1;
            locationMethods.getDriverList(this.formData);
        },
        go (id) {
            this.$router.push({
                path: this.resolvePath('/compatibility/hardware-info/'),
                query: { id: id}
            })
        },
        goToHareware () {
            this.$router.push({
                path: this.resolvePath('/compatibility/hardware/')
            })
        },
        goToSoftware () {
            this.$router.push({
                path: this.resolvePath('/compatibility/software/')
            })
        },
        goToBusinessSoftware () {
            window.open("https://gitee.com/openeuler/technical-certification", "_blank")
        },
         goInstall(path) {
             if (path.includes('http') || path.includes('https')) {
                window.open(path);
                } else if (path) {
                window.open('http://' + path);
            }
        },
    }
};
</script>

<style lang="less" scoped>
.wait {
  padding-bottom: 20px;
  text-align: center;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
}
.compatibility-content {
    width: 1120px;
    margin: 0 auto;
    margin-bottom: 200px;
    @media (max-width: 1000px) {
        width: 100%;
        padding: 0 30px;
        margin-bottom: 80px;
    }
    /deep/ .el-tabs__nav-scroll {
        @media screen and (max-width:1120px) {
            display: flex;
            justify-content: center;
        }
    }
    /deep/ .el-tabs__item {
        font-size: 24px;
        color:rgba(0, 0, 0, 0.5);
    }
    /deep/ .el-tabs__item.is-active {
        font-size: 24px;
        color:#000;
    }
    /deep/ .el-tabs__nav-wrap::after {
        height: 0px;
    }
    .compatibility-filter {
        margin: 30px 0 28px 0;
        @media (max-width: 1000px) {
            display: flex;
            flex-direction: column;
            margin: 20px 0;
        }
        .search-box {
            float: right;
            margin-right: 0;
        }
        .label-font{
            span{
                font-size: 15px;
            }
        }
        .el-form-item {
            margin-bottom: 0;
            margin-right: 20px;
            @media (max-width: 1000px) {
                margin-bottom: 20px;
                margin-right: 0;
            }
            /deep/ .el-form-item__content {
                @media (max-width: 1000px) {
                    width: 100%;
                } 
            }
            /deep/ .el-form-item__label {
            color: #000;
            font-size: 18px;
            font-size: 18px;
            vertical-align: center;
            @media (max-width: 1000px) {
                display: none !important;
            }
        }
        }
        .pc-select,
        .pc-search {
            width: 170px;
            height: 32px;
            @media (max-width: 1000px) {
                display: none;
            }
            .icon-search{
                cursor: pointer;
            } 
        }
        .pc-search {
            width: 250px;
        }
        .pc-search-en {
            width:315px;
        }
        .mobile-select,
        .mobile-search {
            display: none;
            width:100%;
            @media (max-width: 1000px) {
                display: inline-table;
                .icon-search {
                    right: 6px;
                }
            }
            .el-input__suffix {
                right: 10px;
            }
        }
    }
    .table-pc {
        @media (max-width: 1000px) {
            display: none;
        }
        .table-link {
            color: #002fa7;
            text-decoration: none;
            cursor: pointer;
        }
    }
    .table-mobile {
        line-height: 16px;
        display: none;
        width: 100%;
        font-size: 12px;
        @media (max-width: 1000px) {
            display: block;
        }
        .table-link {
            color: #002fa7;
            text-decoration: none;
            cursor: pointer;
        }
        .item {
            padding: 20px;
            &:nth-child(odd) {
                background-color: rgba(0, 0, 0, 0.05);
            }
            li {
                margin-bottom: 12px;
                color: rgba(0, 0, 0, 0.5);
                word-break: break-all;
                span {
                    color: #000;
                    margin-right: 4px;
                }
            }
            li:last-child {
                margin-bottom: 0;
            }
        }
    }
    .compatibility-pagination {
        margin-top: 60px;
    }
    .bottomBanner {
        margin-top:40px;
        font-size: 18px;
        a {
            color: #002fa7;
            text-decoration: none;
            cursor: pointer;
        }
    }
    /deep/ .el-table {
        color: rgba(0, 0, 0, 0.85);
    }
    /deep/ .el-table thead {
        color: #000;
        font-size: 16px;
    }
    /deep/ .el-table th {
        background-color: rgba(0, 0, 0, 0.05);
    }
    /deep/ .el-table--striped .el-table__body tr.el-table__row--striped td {
        background-color: rgba(0, 0, 0, 0.05);
    }
    /deep/ .el-table td,
    /deep/ .el-table th {
        padding: 31px 0;
    }
}
</style>
