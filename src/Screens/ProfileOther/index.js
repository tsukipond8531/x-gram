import {
  ArrowRightSvg,
  BlockSvg,
  CommentSvg,
  DotsSvg,
  FollowSvg,
  GridSvg,
  LinkSvg,
  ShareSvg,
  UnfollowSvg,
  VideoSvg,
} from '@/Assets/Svg'
import {
  AppBottomSheet,
  AppImage,
  AppText,
  Box,
  Container,
  LoadingIndicator,
  Obx,
  Padding,
  Position,
  PostGridItem,
  PostPreviewModal,
} from '@/Components'
import { PageName } from '@/Config'
import { useAppTheme } from '@/Hooks'
import { goBack, navigate, navigateToConversationDetail } from '@/Navigators'
import { diaLogStore, profileStore, userStore } from '@/Stores'
import { Colors, Layout, screenHeight, XStyleSheet } from '@/Theme'
import { formatAmount } from '@/Utils'
import { BlurView } from '@react-native-community/blur'
import { toJS } from 'mobx'
import { useLocalObservable } from 'mobx-react-lite'
import React, { useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Image, Share, TouchableOpacity, View } from 'react-native'
import InAppBrowser from 'react-native-inappbrowser-reborn'
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
const PostType = {
  Post: 'post',
  Video: 'video',
}

const ProfileOther = () => {
  const { t } = useTranslation()
  const { Images } = useAppTheme()
  const scrollY = useSharedValue(0)
  const headerButtonAnim = useSharedValue(0)
  const optionSheetRef = useRef(null)
  const state = useLocalObservable(() => ({
    postType: PostType.Post,
    previewPost: null,
    updatingCover: false,
    updatingAvatar: false,
    setPreviewPost: (post, specs) => (state.previewPost = { post, specs }),
    hidePreviewPost: () => (state.previewPost = null),
    setPostType: postType => (state.postType = postType),
    setUpdatingCover: updatingCover => (state.updatingCover = updatingCover),
    setUpdatingAvatar: updatingAvatar =>
      (state.updatingAvatar = updatingAvatar),
    get filteredPosts() {
      const photoPosts = profileStore.posts
        .filter(post => !post.medias[0].is_video)
        .slice()
      const videoPosts = profileStore.posts
        .filter(post => post.medias[0].is_video)
        .slice()
      return [
        ...PostTabs,
        ...(state.postType === PostType.Post ? photoPosts : videoPosts),
      ]
    },
  }))

  const scrollHandler = useCallback(event => {
    scrollY.value = event.nativeEvent.contentOffset.y
    if (
      event.nativeEvent.contentOffset.y > 150 &&
      headerButtonAnim.value === 0
    ) {
      headerButtonAnim.value = withTiming(1)
    } else if (
      event.nativeEvent.contentOffset.y < 150 &&
      headerButtonAnim.value === 1
    ) {
      headerButtonAnim.value = withTiming(0)
    }
  }, [])

  const PostTabs = useMemo(
    () => [
      {
        type: PostType.Post,
        icon: (
          <Obx>
            {() => (
              <GridSvg
                color={
                  state.postType === PostType.Post
                    ? Colors.secondary
                    : Colors.gray
                }
                size={20}
              />
            )}
          </Obx>
        ),
      },
      {
        type: PostType.Video,
        icon: (
          <Obx>
            {() => (
              <VideoSvg
                color={
                  state.postType === PostType.Video
                    ? Colors.secondary
                    : Colors.gray
                }
                size={28}
              />
            )}
          </Obx>
        ),
      },
    ],
    [],
  )

  const ListHeader = useMemo(
    () => (
      <Box
        backgroundColor={Colors.kE6EEFA}
        topLeftRadius={50}
        topRightRadius={50}
        marginTop={200}
        paddingBottom={16}
      >
        <Box center row paddingHorizontal={20} paddingBottom={8}>
          <View>
            <Obx>
              {() => (
                <Box
                  style={styles.avatarContainer}
                  overflow="hidden"
                  radius={99}
                  center
                  marginTop={-50}
                >
                  <AppImage
                    containerStyle={styles.avatar}
                    source={{
                      uri: profileStore.profileInfo.avatar_url,
                    }}
                    lightbox
                  />
                  <Obx>
                    {() =>
                      state.updatingAvatar && (
                        <View style={styles.uploadingView}>
                          <LoadingIndicator size={16} color={Colors.white} />
                        </View>
                      )
                    }
                  </Obx>
                </Box>
              )}
            </Obx>
          </View>
        </Box>
        <Box marginTop={0} center>
          <AppText fontWeight={700} fontSize={20}>
            <Obx>{() => profileStore.profileInfo.full_name}</Obx>
          </AppText>
          <AppText fontWeight={600} color={Colors.placeholder} fontSize={12}>
            @{profileStore.profileInfo.user_id}
          </AppText>
          <Padding top={8} />
          <AppText
            align="center"
            color={Colors.blueblack}
            fontWeight={600}
            lineHeight={20}
          >
            <Obx>{() => profileStore.profileInfo.bio}</Obx>
          </AppText>
          <Box row marginTop={16} align="center">
            <TouchableOpacity
              onPress={() =>
                navigateToConversationDetail(toJS(profileStore.profileInfo))
              }
              style={styles.profileBtn}
            >
              <CommentSvg color={Colors.primary} size={18} />
            </TouchableOpacity>
            <Obx>
              {() => {
                const isFollowing = userStore.isFollowing(
                  profileStore.profileInfo.user_id,
                )
                const onUnFollowPress = async () =>
                  userStore.unfollowUser(toJS(profileStore.profileInfo))
                const onFollowPress = async () =>
                  userStore.followUser(toJS(profileStore.profileInfo))
                return (
                  <TouchableOpacity
                    onPress={isFollowing ? onUnFollowPress : onFollowPress}
                    style={styles.followBtn}
                  >
                    <>
                      {isFollowing ? (
                        <UnfollowSvg size={14} color={Colors.white} />
                      ) : (
                        <FollowSvg size={14} color={Colors.white} />
                      )}
                      <Padding left={2} />
                      <AppText
                        lineHeight={14}
                        fontWeight={600}
                        color={Colors.white}
                      >
                        {t(
                          isFollowing ? 'profile.following' : 'profile.follow',
                        )}
                      </AppText>
                    </>
                  </TouchableOpacity>
                )
              }}
            </Obx>
            <TouchableOpacity
              onPress={() => {
                Share.share({
                  title: `${profileStore.profileInfo.full_name} on XGram`,
                  message: `https://xgram.app/u/${profileStore.profileInfo.user_id}`,
                })
              }}
              style={styles.profileBtn}
            >
              <ShareSvg size={18} color={Colors.primary} />
            </TouchableOpacity>
          </Box>
          <Box
            marginVertical={16}
            width="100%"
            paddingHorizontal={16}
            row
            center
          >
            <TouchableOpacity style={styles.profileNumberBtn}>
              <AppText fontSize={16} fontWeight={800} color={Colors.blueblack}>
                <Obx>{() => formatAmount(profileStore.posts.length)}</Obx>
              </AppText>
              <AppText fontWeight={600} fontSize={12} color={Colors.black50}>
                {t('search.posts')}
              </AppText>
            </TouchableOpacity>
            <Box
              height={40}
              width={1}
              backgroundColor={Colors.white}
              radius={99}
            />
            <TouchableOpacity
              onPress={() => navigate(PageName.FollowScreen)}
              style={styles.profileNumberBtn}
            >
              <AppText fontSize={16} fontWeight={800} color={Colors.blueblack}>
                <Obx>{() => formatAmount(profileStore.followings.length)}</Obx>
              </AppText>
              <AppText fontWeight={600} fontSize={12} color={Colors.black50}>
                {t('profile.followings')}
              </AppText>
            </TouchableOpacity>
            <Box
              height={40}
              width={1}
              backgroundColor={Colors.white}
              radius={99}
            />
            <TouchableOpacity
              onPress={() =>
                navigate(PageName.FollowScreen, {
                  isFollowers: true,
                })
              }
              style={styles.profileNumberBtn}
            >
              <AppText fontSize={16} fontWeight={800} color={Colors.blueblack}>
                <Obx>{() => formatAmount(profileStore.followers.length)}</Obx>
              </AppText>
              <AppText fontWeight={600} fontSize={12} color={Colors.black50}>
                {t('profile.followers')}
              </AppText>
            </TouchableOpacity>
          </Box>
          <Box center width="100%" paddingHorizontal={16}>
            <Obx>
              {() =>
                profileStore.profileInfo?.websites?.map((web, index) => (
                  <TouchableOpacity
                    onPress={() => InAppBrowser.open(web)}
                    style={styles.webBtn}
                    key={index}
                  >
                    <LinkSvg color={Colors.blueblack} size={12} />
                    <Padding left={4} />
                    <AppText
                      color={Colors.primary}
                      fontWeight={600}
                      fontSize={10}
                    >
                      {web}
                    </AppText>
                  </TouchableOpacity>
                ))
              }
            </Obx>
          </Box>
        </Box>
      </Box>
    ),
    [],
  )
  const ListFooterComponent = useMemo(() => {
    return (
      <>
        <Obx>
          {() =>
            state.filteredPosts.length === 3 && (
              <Box height={190} center backgroundColor={Colors.white}>
                <>
                  <Image
                    style={styles.emptyIcon}
                    resizeMode="contain"
                    source={Images.pack4_15}
                  />
                  {state.postType === PostType.Post ? (
                    <AppText
                      fontSize={16}
                      fontWeight={600}
                      color={Colors.placeholder}
                    >
                      {t('profile.you_have_not_photo_yet')}
                    </AppText>
                  ) : state.postType === PostType.Bookmark ? (
                    <AppText
                      fontSize={16}
                      fontWeight={600}
                      color={Colors.placeholder}
                    >
                      {t('profile.you_have_not_bookmark_yet')}
                    </AppText>
                  ) : (
                    <AppText
                      fontSize={16}
                      fontWeight={600}
                      color={Colors.placeholder}
                    >
                      {t('profile.you_have_not_video_yet')}
                    </AppText>
                  )}
                </>
              </Box>
            )
          }
        </Obx>
        <Box height={90} backgroundColor={Colors.kE6EEFA} />
      </>
    )
  }, [])

  const headerOverlayStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(scrollY.value, [0, 100], [0, 1]),
    }),
    [],
  )
  const headerLeftButtonStyle = useAnimatedStyle(() => ({
    opacity: 1 - headerButtonAnim.value,
    transform: [
      {
        translateX: -headerButtonAnim.value * 100,
      },
    ],
  }))
  const headerRightButtonStyle = useAnimatedStyle(() => ({
    opacity: 1 - headerButtonAnim.value,
    transform: [
      {
        translateX: headerButtonAnim.value * 100,
      },
    ],
  }))

  const onOpenPreview = useCallback((post, { x, y, height, width }) => {
    state.setPreviewPost(post, { x, y, height, width })
  }, [])

  const renderPostItem = useCallback(({ item, index }) => {
    const onPress = () => {
      if (index <= 2) {
        state.setPostType(item.type)
      } else {
        navigate(PageName.PostDetailScreen, {
          postId: item.post_id,
        })
      }
    }
    return index <= 2 ? (
      <TouchableOpacity onPress={onPress} style={styles.tabView}>
        {item.icon}
      </TouchableOpacity>
    ) : (
      <PostGridItem
        enablePreview
        onOpenPreview={specs => onOpenPreview(item, specs)}
        onClosePreview={() => state.hidePreviewPost()}
        onPress={onPress}
        post={item}
      />
    )
  }, [])
  return (
    <Container disableTop style={styles.rootView}>
      <Position top={0} left={0} right={0} zIndex={-1}>
        <Box height={250}>
          <Obx>
            {() => (
              <AppImage
                source={{
                  uri: profileStore.profileInfo.cover_url,
                }}
                resizeMode="cover"
                containerStyle={styles.coverPhoto}
              />
            )}
          </Obx>
          <Animated.View style={[Layout.fill, headerOverlayStyle]}>
            <BlurView style={Layout.fill} />
          </Animated.View>
        </Box>
      </Position>
      <Position top={0} left={0} right={0} zIndex={99}>
        <SafeAreaView>
          <Box
            marginTop={10}
            row
            justify="space-between"
            paddingHorizontal={16}
          >
            <Animated.View style={headerLeftButtonStyle}>
              <TouchableOpacity
                onPress={goBack}
                style={[styles.headerBtn, styles.backBtn]}
              >
                <ArrowRightSvg size={18} />
              </TouchableOpacity>
            </Animated.View>
            <Animated.View style={headerRightButtonStyle}>
              <TouchableOpacity
                onPress={() => optionSheetRef.current?.snapTo?.(0)}
                style={styles.headerBtn}
              >
                <DotsSvg size={18} />
              </TouchableOpacity>
            </Animated.View>
          </Box>
        </SafeAreaView>
      </Position>
      <Obx>
        {() => (
          <Animated.FlatList
            ListHeaderComponent={ListHeader}
            ListFooterComponent={ListFooterComponent}
            columnWrapperStyle={styles.listView}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            numColumns={3}
            data={state.filteredPosts.slice()}
            stickyHeaderIndices={[1]}
            renderItem={renderPostItem}
            keyExtractor={item => item.post_id}
            initialNumToRender={9}
            showsVerticalScrollIndicator={false}
          />
        )}
      </Obx>
      <Obx>
        {() => (
          <PostPreviewModal
            visible={!!state.previewPost}
            post={state?.previewPost?.post}
            {...(state?.previewPost?.specs || {})}
          />
        )}
      </Obx>
      <AppBottomSheet ref={optionSheetRef} snapPoints={[screenHeight * 0.4]}>
        <Box
          paddingVertical={12}
          center
          borderBottomWidth={0.5}
          borderBottomColor={Colors.border}
        >
          <AppText fontSize={16} fontWeight={700}>
            {t('profile.profile_options')}
          </AppText>
        </Box>
        <Box fill>
          <TouchableOpacity
            onPress={() => {
              diaLogStore.showDiaLog({
                title: t('home.block_so', {
                  so: profileStore.profileInfo.full_name,
                }),
                message: t('account.confirm_block'),
                dialogIcon: 'pack1_3',
                showCancelButton: true,
                onPress: () =>
                  userStore.blockUser(toJS(profileStore.profileInfo)),
              })
            }}
            style={styles.optionBtn}
          >
            <BlockSvg size={20} />
            <Padding left={14} />
            <AppText fontSize={16} fontWeight={500}>
              <Obx>
                {() =>
                  t('home.block_so', {
                    replace: { so: profileStore.profileInfo.full_name },
                  })
                }
              </Obx>
            </AppText>
          </TouchableOpacity>
        </Box>
      </AppBottomSheet>
    </Container>
  )
}

export default ProfileOther

const styles = XStyleSheet.create({
  rootView: {
    flex: 1,
  },
  listView: {
    backgroundColor: Colors.white,
  },
  coverPhoto: {
    ...XStyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  infoBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: Colors.white,
    borderWidth: 4,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  avatarContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    borderRadius: 99,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  updateAvatarBtn: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: Colors.white50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    right: 0,
  },
  settingBtn: {
    height: 44,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.kC2C2C2,
    borderRadius: 5,
    marginLeft: 16,
  },
  tabView: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    paddingVertical: 30,
    marginBottom: 10,
    borderBottomColor: Colors.border,
    borderBottomWidth: 0.5,
  },
  uploadingView: {
    ...XStyleSheet.absoluteFillObject,
    zIndex: 99,
    backgroundColor: Colors.black50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  webBtn: {
    borderRadius: 99,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  profileNumberBtn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  followBtn: {
    height: 40,
    paddingHorizontal: 74,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 99,
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,

    elevation: 10,
  },
  profileBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.primary,
    borderWidth: 1,
    marginHorizontal: 24,
    backgroundColor: Colors.white,
  },
  backBtn: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
})
