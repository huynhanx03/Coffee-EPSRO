import { View, Text, useWindowDimensions } from 'react-native'
import { BarChart } from 'react-native-gifted-charts'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import React from 'react'
import { formatPrice } from '../../utils'

const EarningChart = () => {
    const widthScreen = useWindowDimensions().width - 32
    const data = [
        { value: 25000000, frontColor: '#006DFF', gradientColor: '#009FFF', label: 'Jan' },

        { value: 35000000, frontColor: '#006DFF', gradientColor: '#009FFF', label: 'Feb' },

        { value: 45000000, frontColor: '#006DFF', gradientColor: '#009FFF', label: 'Mar' },

        { value: 52000000, frontColor: '#006DFF', gradientColor: '#009FFF', label: 'Apr' },

        { value: 30000000, frontColor: '#006DFF', gradientColor: '#009FFF', label: 'May' },
        { value: 41234567, frontColor: '#006DFF', gradientColor: '#009FFF', label: 'Jun' },
    ]

    const formatYAxisLabel = (value) => {
        if (value >= 1000000000) {
            return (value / 1000000000).toFixed(1) + 'b';
        } else if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + 'm';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'k';
        } else {
            return value.toString();
        }
    };

    return (
        <View
            className="shadow-lg"
            style={{
                marginTop: hp(10),
                marginHorizontal: 16,
                padding: 20,
                borderRadius: 20,
                backgroundColor: '#fff',
            }}>
            <Text style={{ color: 'black', fontSize: 16, fontWeight: 'bold' }}>Doanh thu</Text>
            <View style={{ padding: 16, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                <BarChart
                    // width={wp(68)}
                    data={data}
                    height={hp(26)}
                    barWidth={wp(9)}
                    initialSpacing={20}
                    spacing={wp(70) / 10}
                    barBorderRadius={4}
                    showGradient
                    yAxisThickness={0}
                    xAxisType={'dashed'}
                    xAxisColor={'lightgray'}
                    yAxisTextStyle={{ color: 'black' }}
                    yAxisLabelContainerStyle={{ width: wp(20), justifyContent: 'start', marginLeft: -wp(4) }}
                    noOfSections={4}
                    labelWidth={35}
                    xAxisLabelTextStyle={{ color: 'black', textAlign: 'center' }}
                    showLine={true}
                    isAnimated
                    animationDuration={1000}
                    lineConfig={{
                        color: '#F29C6E',
                        thickness: 3,
                        curved: true,
                        hideDataPoints: true,
                        shiftY: 20,
                        initialSpacing: 30,
                        isAnimated: true,
                        animationDuration: 800,
                    }}
                    formatYLabel={(value) => formatYAxisLabel(value)}
                    autoCenterTooltip
                    shiftX={wp(90)}
                    maxValue={1000000000}
                    renderTooltip={(item, index) => {
                        return (
                            <View
                                style={{
                                    position: 'absolute',
                                    bottom: -hp(10),
                                    left: -wp(5),
                                    backgroundColor: '#ffcefe',
                                    paddingHorizontal: 6,
                                    paddingVertical: 4,
                                    borderRadius: 4,
                                }}>
                                <Text>{formatPrice(item.value)}</Text>
                            </View>
                        )
                    }}
                />
            </View>
        </View>
    )
}

export default EarningChart